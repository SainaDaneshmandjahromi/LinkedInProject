<template>
<div>
<b-card :title="this.user.username" :sub-title="this.comment.date">
    <b-card-text>{{this.comment.text}}</b-card-text>
    <b-link  class="card-link"  @click="showReply">Reply</b-link>
    <b-link  class="card-link"  @click="commentLike">Like {{this.commentLikesCount}}</b-link>
    <div v-show="showinput">
        <br>
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
import {  TYPE_COMMENT_LIKE,TYPE_COMMENT_REPLAY  , insertNotification} from '@/db/user/notifications'
import{getUserById} from '@/db/user/users'
import {getCommentReplies, insertReply} from'@/db/posting/comments'
import moment from 'moment'
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
        userId:'',
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
            this.replies = await  getCommentReplies(this.comment.id)
            console.log(this.replies)
            if(this.replies.length){
                console.log("replies",this.replies[0].userId)
                this.show = !this.show
            }
            this.showinput = !this.showinput

        },
        async sendReply(event){
            const userId = this.$route.params.userId
            const postId = this.$route.params.postId
            this.myreply.userId = this.userId
            this.myreply.date =  await  moment().format('MMMM Do YYYY, h:mm:ss a')
            await  insertReply(userId,postId,this.comment.id,this.myreply)
            //  add notification
                var notif = {
                receiverUserId : this.comment.userId,
                transmitterUserId : this.$route.params.userId,
                type: TYPE_COMMENT_REPLAY,
                isRead: 0,
                postId: this.$route.params.postId,
                commentId: this.comment.id
                }
                await insertNotification(notif)
        
            
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
            //  add notification
                var notif = {
                receiverUserId : this.comment.userId,
                transmitterUserId : this.$route.params.userId,
                type: TYPE_COMMENT_LIKE,
                isRead: 0,
                postId: this.$route.params.postId,
                commentId: this.comment.id
                }
                await insertNotification(notif)
        
            }

        }
    }    
      
    
}
</script>

