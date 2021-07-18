<template>
  <div>
    <!-- Archive Or Normal -->
    <b-list-group v-if="pageStat.unread == 0">
      <b-list-group-item button class="d-flex justify-content-between align-items-center" 
              @click="$emit('showMessages', chat.id)">
            {{user.username}}
          
      <b-badge variant="primary" pill v-if="mychatuser.messageUnreadCount != 0">
        {{mychatuser.messageUnreadCount}}</b-badge>
      
      <b-badge variant="primary" pill v-else-if="mychatuser.readChatStat === 'Notread'">
      unread </b-badge>

      </b-list-group-item>
    </b-list-group>

    <!-- Unread -->
    <div v-else>
      <b-list-group v-if="mychatuser.messageUnreadCount != 0">
        <b-list-group-item button v-if="mychatuser.messageUnreadCount != 0" 
                          class="d-flex justify-content-between align-items-center" @click="$emit('showMessages', chat.id)">
                          {{user.username}}
            
        <b-badge variant="primary" pill v-if="mychatuser.messageUnreadCount != 0">
          {{ mychatuser.messageUnreadCount }}</b-badge>

        </b-list-group-item>
      </b-list-group>

      <b-list-group v-else-if="mychatuser.readChatStat === 'NotRead'">
        <b-list-group-item button  class="d-flex justify-content-between align-items-center" 
                                   @click="$emit('showMessages', chat.id)">{{user.username}}
            
        <b-badge variant="primary" pill v-if="mychatuser.messageUnreadCount != 0">
          {{ mychatuser.messageUnreadCount }}</b-badge>
        <b-badge variant="primary" pill v-else> unread </b-badge>

        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { getUserById } from '@/db/user/users'
import {  getUserChat } from '@/db/messaging/userChats'

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
    mychatuser:{
      id:'',
      userId : '',
      chatId : '',
      messageUnreadCount : '',
      archiveChatStat: '',
      readChatStat: '',
    },
    pageStat:{
      unread:''
    }
    
  }),
  async mounted() {
    console.log("Hi")
    if(this.chat.firstParticipantId == this.$route.params.userId){
      this.user = await getUserById(this.chat.secondParticipantId)
    }
    else{
      this.user = await getUserById(this.chat.firstParticipantId)
    }

    this.mychatuser = await getUserChat(this.chat.id,this.$route.params.userId)
    console.log(this.chat.id)

    if(this.$route.name == "UnreadChat"){
      this.pageStat.unread = 1
    }
    else{
      this.pageStat.unread = 0
    }
  }
}
</script>
