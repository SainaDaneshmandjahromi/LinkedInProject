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
          <!-- create notification base on it's type -->
          <b-col cols="auto" v-if="notification.type === 'TYPE_BIRTHDAY'">
            It's
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            's birthday
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_PROFILE_SEEN'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            saw your profile
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_POST_LIKE'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            Liked your
            <router-link :to="`${notification.postId}/expandpost`">
              post
            </router-link>
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_POST_COMMENT'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            Commented on your
            <router-link :to="`${notification.postId}/expandpost`">
              Post
            </router-link>
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_COMMENT_LIKE'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            Liked your comment on this
            <router-link :to="`${notification.postId}/expandpost`">
              Post
            </router-link>
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_COMMENT_REPLAY'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            Replied your comment on this
            <router-link :to="`${notification.postId}/expandpost`">
              Post
            </router-link>
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_ENDORSE'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            endorsed your skill ({{ notification.skill.name }})
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_CHANGE_JOB_POSITION'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            current position changed to <span class="font-italic">{{ notification.newCurrentCompany }}</span>
          </b-col>

          <!-- Mark as read btn -->
          <b-col cols="auto">
            <b-button variant="primary" @click="markAsRead(notification)">
              Mark as read
            </b-button>
          </b-col>
        </b-row>
      </b-card>

    </b-tab>

    <b-tab :title="`Read(${readNotifications.length})`">

      <b-row class="mt-3">
        <b-col cols="auto">
          <b-button
            variant="danger"
            @click="markAllAsUnread"
          >
            Mark all as unread
          </b-button>
        </b-col>
      </b-row>

      <b-card class="mt-2" v-for="notification in readNotifications" :key="notification.id">

        <b-row class="justify-content-between">
          <!-- create notification base on it's type -->
          <b-col cols="auto" v-if="notification.type === 'TYPE_BIRTHDAY'">
            It's
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            's birthday
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_PROFILE_SEEN'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            saw your profile
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_POST_LIKE'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            Liked your
            <router-link :to="`${notification.postId}/expandpost`">
              post
            </router-link>
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_POST_COMMENT'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            Commented on your
            <router-link :to="`${notification.postId}/expandpost`">
              Post
            </router-link>
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_COMMENT_LIKE'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            Liked your comment on this
            <router-link :to="`${notification.postId}/expandpost`">
              Post
            </router-link>
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_COMMENT_REPLAY'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            Replied your comment on this
            <router-link :to="`${notification.postId}/expandpost`">
              Post
            </router-link>
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_ENDORSE'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            endorsed your skill ({{ notification.skill.name }})
          </b-col>

          <b-col cols="auto" v-else-if="notification.type === 'TYPE_CHANGE_JOB_POSITION'">
            <router-link :to="`anonymous-profile/${notification.user.id}`">
              {{ notification.user.username }}
            </router-link>
            current position changed to <span class="font-italic">{{ notification.newCurrentCompany }}</span>
          </b-col>

          <!-- Mark as read btn -->
          <b-col cols="auto">
            <b-button variant="secondary" @click="markAsUnread(notification)">
              Mark as unread
            </b-button>
          </b-col>
        </b-row>
      </b-card>

    </b-tab>

  </b-tabs>
</template>

<script>
import moment from 'moment'
import {
  getBirthdayNotificationByUserIdIfTodayInserted,
  getReadNotificationByReceiverUserId,
  getUnreadNotificationByReceiverUserId,
  insertNotification,
  TYPE_BIRTHDAY,
  updateNotification,
  updateNotificationsByUserId
} from '../../db/user/notifications'
import { getUserById } from '../../db/user/users'
import { getSkillById } from '../../db/user/skills'
import { userConnection } from '../../db/user/connections'

export default {
  name: 'UserNotifications',
  data: () => ({
    unreadNotifications: [],
    readNotifications: []
  }),
  methods: {
    async markAsRead(notification) {
      notification.isRead = true
      await updateNotification(notification.id, notification)

      this.unreadNotifications = this.unreadNotifications.filter(n => n.id !== notification.id)
      this.readNotifications.push(notification)
    },
    async markAllAsRead() {
      await updateNotificationsByUserId(this.$route.params.userId, {
        isRead: true
      })
      this.readNotifications.push.apply(this.readNotifications, this.unreadNotifications)
      this.unreadNotifications = []
    },
    async markAsUnread(notification) {
      notification.isRead = false
      await updateNotification(notification.id, notification)

      this.readNotifications = this.readNotifications.filter(n => n.id !== notification.id)
      this.unreadNotifications.push(notification)
    },
    async markAllAsUnread() {
      await updateNotificationsByUserId(this.$route.params.userId, {
        isRead: false
      })
      this.unreadNotifications.push.apply(this.unreadNotifications, this.readNotifications)
      this.readNotifications = []
    },
    async checkIfItsConnectionsBirthday() {

      const userConnections = await userConnection(this.$route.params.userId)
      for (const userConnection of userConnections) {

        const userBirthday = moment(userConnection.birthday, 'YYYY-MM-DD')
        const now = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')


        const today = moment().format('YYYY-MM-DD')
        console.log(today)
        const previousBirthdayNotification = await getBirthdayNotificationByUserIdIfTodayInserted(
          this.$route.params.userId,
          userConnection.id,
          today
        )

        console.log(previousBirthdayNotification.length)

        if (previousBirthdayNotification.length === 0 &&
          userBirthday.date() === now.date() &&
          userBirthday.month() === now.month()) {
          await insertNotification({
            receiverUserId: this.$route.params.userId,
            transmitterUserId: userConnection.id,
            type: TYPE_BIRTHDAY,
            isRead: false,
            creationDate: moment().format('YYYY-MM-DD')
          })
        }
      }
    }

  },
  async mounted() {

    await this.checkIfItsConnectionsBirthday()

    const unreadNotifications = await getUnreadNotificationByReceiverUserId(this.$route.params.userId)
    for (const notification of unreadNotifications) {
      const user = await getUserById(notification.transmitterUserId)
      let skill
      if (notification.skillId) {
        skill = await getSkillById(notification.skillId)
      }
      this.unreadNotifications.push({
        ...notification,
        user,
        skill
      })
    }

    const readNotifications = await getReadNotificationByReceiverUserId(this.$route.params.userId)
    for (const notification of readNotifications) {
      const user = await getUserById(notification.transmitterUserId)
      console.log(notification)
      let skill
      if (notification.skillId) {
        skill = await getSkillById(notification.skillId)
      }
      this.readNotifications.push({
        ...notification,
        user,
        skill
      })
    }
  }
}
</script>
