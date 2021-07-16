<template>
  <div>
    <b-list-group v-if="pageStat.unread == 0">
    <b-list-group-item button class="d-flex justify-content-between align-items-center" 
            @click="$emit('showMessages', chat.id)">
          {{user.username}}
        
    <b-badge variant="primary" pill v-if="mychat.cnt != 0">{{mychat.cnt}}</b-badge>

    </b-list-group-item>
    </b-list-group>

    <b-list-group v-else>
    <b-list-group-item button v-if="mychat.cnt != 0" class="d-flex justify-content-between align-items-center" 
            @click="$emit('showMessages', chat.id)">
          {{user.username}}
        
    <b-badge variant="primary" pill v-if="mychat.cnt != 0">{{mychat.cnt}}</b-badge>

    </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { getUserById } from '@/db/user/users'
import { getUnreadCount } from '@/db/messaging/messages'

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
    mychat:{
      id:'',
      cnt:''
    },
    pageStat:{
      unread:''
    }
    
  }),
  async mounted() {
    if(this.chat.firstParticipantId == this.$route.params.userId){
      this.user = await getUserById(this.chat.secondParticipantId)
    }
    else{
      this.user = await getUserById(this.chat.firstParticipantId)
    }
    this.mychat = await getUnreadCount(this.chat.id,this.$route.params.userId)
    if(this.$route.name == "UnreadChat"){
      this.pageStat.unread = 1
    }
    else{
      this.pageStat.unread = 0
    }
  }
}
</script>
