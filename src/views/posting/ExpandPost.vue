<template>

    <div>
        <b-card :title= this.user.username>

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
            <div :key="comment.id" v-for="comment in comments">
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
    }
  }),
  props: {
    comments: Array,
  },
  components: {
    Comment
  }, 
  async created() {
        this.post = await getPostById(this.$route.params.userId)
        this.user  = await getUserById(this.$route.params.userId)
        this.comments = await getPostComments(this.$route.params.postId)
    },
    methods: {
      async onClick(event) {
          
        const userId = this.$route.params.userId
        const postId = this.$route.params.postId
        await insertComment(userId,postId,this.comment)
        
        this.comments = await getPostComments(this.$route.params.postId)
        this.comment.text = ''
        }
    }
}
</script>