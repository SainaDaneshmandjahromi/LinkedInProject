<template>
<div>
<b-card >
    
    <h4>{{this.user.username}}</h4>
    <b-card-text>{{this.comment.text}}</b-card-text>
    <b-link  class="card-link"  @click="showReply">Reply</b-link>
    <b-link  class="card-link"  @click="commentLike">Like {{this.commentLikesCount}}</b-link>
    <div v-show="showinput">
        <b-form-textarea
            id="textarea"
            v-model="myreply.text"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>
        <br>
        <b-col>
          <b-button @click="sendReply" variant="outline-primary">Send Reply</b-button>
        </b-col>
        <br>
    </div>
    <div v-show="show" >
        <div :key="reply.id" v-for="reply in this.replies">
                <comment
                :comment="reply"
                />
        <br>
        </div>
    </div>
    
  </b-card>
</div>
</template>

<script>
import{getUserById} from '@/db/user/users'
import {getCommentReplies, insertReply} from'@/db/posting/comments'
// import{like_post,  getPostLikesCount,getPostLikes} from '@/db/posting/postLikes'
import {getCommentLikes, like_comment} from '@/db/posting/commentLikes' 
export default {
  name: 'comment',
  props: {
    comment: Object,
    replies: Array
  },
   data: () => ({
    user: {
        id: '',
        username: '',
        },
    myreply: {
        text: '',
        date:null
        },
    show: false,
    showinput : false ,
    commentLikesCount : '',
    }),
    async created() {
        
        this.user  = await getUserById(this.comment.userId)
        var cml = await getCommentLikes(this.comment.id)
        this.commentLikesCount = cml.length
        },
    methods:{
        async showReply(event){
            this.replies = await   getCommentReplies(this.comment.id)
            if(this.replies.length){
                console.log("replies",this.replies[0].userId)
                this.show = !this.show
            }
            this.showinput = !this.showinput

        },
        async sendReply(event){
            const userId = this.$route.params.userId
            const postId = this.$route.params.postId
            await  insertReply(userId,postId,this.comment.id,this.myreply)
            this.myreply.text=''
            console.log(this.replies)
            this.replies = await  getCommentReplies(this.comment.id)
            this.show = true
        },
        async commentLike(event){
            const userId = this.$route.params.userId
            const postId = this.$route.params.postId
            var cml = await getCommentLikes(this.comment.id)
            var repeated = false
            cml.forEach(element => {
                if (element.userId == userId){
                    repeated = true
                }
            });
            if (repeated == false){
                await like_comment(userId,this.comment.id)
                this.commentLikesCount += 1
            }

        }
    }    
      
    
}
</script>

