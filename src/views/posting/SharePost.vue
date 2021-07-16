<template>
<div>
    <b-card>
        <b-col >
            <b-form >
            <b-form-textarea
                id="textarea"
                v-model="mypost.text"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                ></b-form-textarea>
                <br>
               <b-col>
                    <b-button @click="onClick" variant="outline-primary">Share</b-button>
                </b-col>
            </b-form>
        </b-col>
        <br>
        <b-card :title= this.user.username>

            <b-card-text>{{this.post.text}}</b-card-text>

        </b-card>
    </b-card>
</div>
</template>

<script>
import{getUserById} from '@/db/user/users'
// import{like_post,  getPostLikesCount,getPostLikes} from '@/db/posting/postLikes'
import{getPostById,sharePost} from '@/db/posting/posts'
// import { getPostComments} from '@/db/posting/comments'
export default {
  name: 'sharepost',
   data: () => ({
    user: {
        id: '',
        username: '',
        },
    post: {
        text: '',
        userId: '',
        media:null,
        date:null
    },
    mypost: {
        text: '',
        userId: '',
        media:null,
        date:null
    },
      likeCount :'',
      cmCount:''
    
    }),
    async created() {
        this.user  = await getUserById(this.$route.params.userId)
        this.post = await getPostById(this.$route.params.postId)
        
        
        },
    methods: {
        async onClick(event){
            await sharePost(this.user.id,this.mypost,this.post.id)
            alert("post is inserted")
            await this.$router.back()
            
        }
      
    }
}
</script>

