<template>

    <div>
        <b-card :title= this.user.username  :sub-title="this.post.date">
            <b-card-text>{{post.text}}</b-card-text>
            <b-form-textarea
                id="textarea"
                v-model="comment.text"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
            ></b-form-textarea>
            <br>
        <b-col  >
          <b-button @click="onClick" variant="outline-primary">Send</b-button>
        </b-col>
        <br>
            <div :key="comment.id" v-for="comment in comments.slice().reverse()">
            <comment
            :comment="comment"
            />
            <br>
            </div>
            
        </b-card>
    </div>
</template>
<script>

import {getPostById} from '@/db/posting/posts'
import{getUserById} from '@/db/user/users'
import {getPostComments, insertComment} from '@/db/posting/comments'
import Comment from '../../components/Comment.vue'
import moment from 'moment'
export default {
  name: 'expandpost',
  data: () => ({
    user: {
      id: '',
      username: '',
    },
    post:{
        text:'',
        media: null,
        date:null
    },
    comment:{
        text:'',
        date: null
    },
    comments: Array
  }),
  components: {
    Comment
  }, 
  async created() {
        this.post = await getPostById(this.$route.params.postId)
        this.user  = await getUserById(this.$route.params.userId)
        this.comments = await getPostComments(this.$route.params.postId)
    },
    methods: {
      async onClick(event) {
          
        var userId = this.$route.params.userId
        var postId = this.$route.params.postId
        this.comment.date = await  moment().format('MMMM Do YYYY, h:mm:ss a')
        await insertComment(userId,postId,this.comment)
        
        this.comments = await getPostComments(this.$route.params.postId)
        this.comment.text = ''
        }
    }
}
</script>