<template>
    <b-list-group>
    <b-list-group-item button class="d-flex justify-content-between align-items-center" >
          {{sender.username }} : {{  message.content}}
    </b-list-group-item>
    </b-list-group>
</template>

<script>
import { getUserById } from '@/db/user/users'

export default {
  name: 'user-chat',
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
