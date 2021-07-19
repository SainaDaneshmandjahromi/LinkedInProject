<template>
<div>
  <b-card :title= this.user.username :sub-title="this.post.date">
      <b-card-text>{{this.post.text}}</b-card-text>
        
        <div v-if="this.hasShared">
          <user-post
            :post="this.sharedpost"
          />
        </div>
       

      <b-link @click="onLike" href="#" class="card-link">Likes {{this.likeCount["cnt"]}}</b-link>
      <b-link  class="card-link"
      :to="`/user/${this.$route.params.userId}/${this.post.id}/expandpost`"
      >Comments {{this.cmCount}}</b-link>
      <b-link  class="card-link" 
      :to="`/user/${this.$route.params.userId}/${post.id}/sharepost`"
      >Share</b-link>
      
  </b-card>
</div>
</template>

<script>
import{getUserById} from '@/db/user/users'
import{like_post,  getPostLikesCount,getPostLikes} from '@/db/posting/postLikes'
import{ getPostById} from '@/db/posting/posts'
import { getPostComments} from '@/db/posting/comments'
import {TYPE_POST_LIKE,insertNotification} from '@/db/user/notifications'
export default {
  name: 'user-post',
  props: {
    post: Object,

  },
   data: () => ({
    user: {
        id: '',
        username: '',
        },
      likeCount :'',
      cmCount:'',
      hasShared:false,
      sharedpost: '',

    }),
    async created() {
        this.user  = await getUserById(this.post.userId)
        console.log(this.user)
        if (this.post.sharedPostId !== null ){
          
          this.sharedpost = await getPostById(this.post.sharedPostId)
            
          this.hasShared = true

        }

        this.likeCount = await  getPostLikesCount(this.post.id)
        const cnt = JSON.stringify(this.likeCount)
    
        var cm = await getPostComments(this.post.id)
        
        this.cmCount = cm.length
        },
    methods: {
    async onLike(event) { 
      var repeated = false
      const userId = this.$route.params.userId
      const postLikes = await getPostLikes(this.post.id)
      await postLikes.forEach(element => {
        console.log("userid", userId)
        console.log(element.userId)
        if (element.userId == userId){
          repeated = true
        }
      });
      if (repeated == false){
        await like_post(userId,this.post.id)
       //  add notification
       var notif = {
           receiverUserId : this.post.userId,
          transmitterUserId : this.$route.params.userId,
          type: TYPE_POST_LIKE,
          content : 'Liked your post!',
          isRead: 'false',
          postId: this.post.id,
          commentId:null

        }
        await insertNotification(notif)
        
        this.likeCount["cnt"] += 1
      }
  
  },

      
    }
}
</script>

