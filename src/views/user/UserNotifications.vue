<template>

  <b-tabs fill>
    <b-tab :title="`Unread(${unreadNotifications.length})`" active>

      <b-row class="mt-3">
        <b-col cols="auto">
          <b-button
            variant="success"
            @click="markAllAsRead"
          >
            Mark all as read
          </b-button>
        </b-col>
      </b-row>

      <b-card class="mt-2" v-for="notification in unreadNotifications" :key="notification.id">
        <b-row class="justify-content-between">

          <b-col cols="auto" v-if="notification.type === 'TYPE_BIRTHDAY'">
            It's
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            birthday
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_PROFILE_SEEN'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            saw your profile
          </b-col>


          <b-col cols="auto">
            <b-button variant="primary" @click="markAsRead(notification)">
              Mark as read
            </b-button>
          </b-col>
        </b-row>
      </b-card>

    </b-tab>
    <b-tab title="Read" :title="`read(${readNotifications.length})`">


    </b-tab>
  </b-tabs>
</template>

<script>
import {
  getReadNotificationByReceiverUserId,
  getUnreadNotificationByReceiverUserId,
  updateNotification,
  updateNotificationsByUserId
} from '../../db/user/notifications'
import { getUserById } from '../../db/user/users'

export default {
  name: 'UserNotifications',
  data: () => ({
    unreadNotifications: [
      {
        type: 'TYPE_BIRTHDAY',
        user: {username: 'mmad', id: 65}
      }
    ],
    readNotifications: []
  }),
  methods: {
    async markAsRead(notification) {
      notification.isRead = 'true'
      await updateNotification(notification.id, notification)

      //todo: add deleted notification to read part
      this.unreadNotifications = this.unreadNotifications.filter(n => n.id !== notification.id)
    },
    async markAllAsRead() {
      await updateNotificationsByUserId(this.$route.params.userId, {
        isRead: true
      })
    }
  },
  async mounted() {

    const unreadNotifications = await getUnreadNotificationByReceiverUserId(this.$route.params.userId)
    for (const notification of unreadNotifications) {
      const user = await getUserById(notification.transmitterUserId)
      this.unreadNotifications.push({
        ...notification,
        user
      })
    }

    const readNotifications = await getReadNotificationByReceiverUserId(this.$route.params.userId)
    for (const notification of readNotifications) {
      const user = await getUserById(notification.transmitterUserId)
      this.readNotifications.push({
        ...notification,
        user
      })
    }


  }
}
</script>
