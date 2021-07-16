<template>
    <b-list-group>
    <b-list-group-item button class="d-flex justify-content-between align-items-center" 
            @click="$emit('showMessages', chat.id)">
          {{user.username}}
        
    <!-- <b-badge variant="primary" pill>14</b-badge> -->

    </b-list-group-item>
    </b-list-group>
</template>

<script>
import { getUserById } from '@/db/user/users'
export default {
  name: 'user-chat',
  props: {
    chat: Object,
  },

  data: () => ({
    user: {
      id: '',
      username: '',
    },
  }),
  async mounted() {
    if(this.chat.firstParticipantId == this.$route.params.userId){
      this.user = await getUserById(this.chat.secondParticipantId)
    }
    else{
      this.user = await getUserById(this.chat.firstParticipantId)
    }
  }
}
</script>
