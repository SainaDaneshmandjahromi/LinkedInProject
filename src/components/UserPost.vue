<template>
<div>
  <b-card 
  v-if="(this.$route.name==='Favorites' && mypost.isFavorite===1) ||!(this.$route.name==='Favorites')">
    <b-card-title>
          <router-link class="font-weight-normal" :to="`/user/${$route.params.userId }/anonymous-profile/${this.mypost.id}`">
            {{ user.username }}
          </router-link>
    </b-card-title>

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

       <b-link  class="card-link" @click="addFavorite" v-if="this.$route.name == 'ThisUserPosts' && mypost.isFavorite !== 1 && isOriginal"
      >Add to my Favorites</b-link>

      <b-link  class="card-link" @click="removeFavorite" v-if="mypost.isFavorite === 1  && isOriginal"
      >Remove from Favorites</b-link>
      
  </b-card>
</div>
</template>

<script>
import{getUserById} from '@/db/user/users'
import{like_post,  getPostLikesCount,getPostLikes} from '@/db/posting/postLikes'
import{ getPostById,changeFavorite} from '@/db/posting/posts'
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
      mypost:'',
      isOriginal : false,

    }),
    async created() {
        this.mypost  = await getPostById(this.post.id)
        this.user  = await getUserById(this.post.userId)
        console.log(this.user)
        if (this.post.sharedPostId !== null ){
          
          this.sharedpost = await getPostById(this.post.sharedPostId)
            
          this.hasShared = true

        }

        if(this.$route.params.userId == this.mypost.userId){
          this.isOriginal = true
        }
        console.log("is original",this.$route.params.userId,this.mypost.userId, this.isOriginal)

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
          isRead: 0,
          postId: this.post.id,
          commentId:null

        }
        await insertNotification(notif)
        
        this.likeCount["cnt"] += 1
      }

  
  },
  async addFavorite(event){
      await changeFavorite(this.post.id, 1)
      console.log("added to favorits")
      this.mypost  = await getPostById(this.post.id)
    },
  async removeFavorite(event){
      await changeFavorite(this.post.id, 0)
      console.log("removed form  favorites")
       this.mypost  = await getPostById(this.post.id)
    }

      
    }
}
</script>

