<template>
  <div>
    <div :key="notif.id" v-for="notif in notifs">
      <template v-if="notif.type === TYPE_POST_LIKE>
        {{notif.transmitter}} liked your post 

      </template>      
    </div>
  </div>
</template>

<script>
import { getUnreadNotificationByReceiverUserId,
TYPE_BIRTHDAY,
 TYPE_PROFILE_SEEN,
 TYPE_POST_LIKE,
TYPE_POST_COMMENT ,
TYPE_COMMENT_LIKE,  
 TYPE_COMMENT_REPLAY , 
 TYPE_ENDORSE ,
 TYPE_CHANGE_JOB_POSITION } from '@/db/user/notifications'
export default {
  name: 'UserNotifications',
   data: () => ({
    
    notifs : [{
      transmitter:'folani ' 
    }]
  }),
  async created() {
      
      //this.notifs = await  getUnreadNotificationByReceiverUserId(this.$route.params.userId)
      
  }
  
}
</script>
