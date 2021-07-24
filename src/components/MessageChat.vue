<template>
  <b-list-group>
    <b-list-group-item button class="d-flex justify-content-between align-items-center">
      <p>
        <span>
          <router-link :to="`/user/${this.$route.params.userId}/anonymous-profile/${sender.id}`">
              {{ sender.username }}
          </router-link>
        </span>: {{ message.content }}
      </p>

    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { getUserById } from '@/db/user/users'


export default {
  name: 'message-chat',
  props: {
    message: Object,
  },
  data: () => ({
    sender: {
      id: '',
      username: '',
    },
  }),
  async mounted() {
    this.sender = await getUserById(this.message.userId)
  }

}
</script>
