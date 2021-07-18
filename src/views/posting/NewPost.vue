<template>
  <div>
    <b-col sm='5'>
      <b-form >
        <b-form-textarea
          id="textarea"
          v-model="post.text"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <br>
        <b-col  >
          <b-button @click="onClick" variant="outline-primary">Share</b-button>
        </b-col>
      </b-form>
    </b-col>
    
  
  </div>
</template>

<script>
import {insertPost} from '@/db/posting/posts'
import moment from 'moment'
  export default {
    data: () => ({
      post: {
        text: '',
        media: null,
        date: null,
      }
  }), 
    methods: {
      async onClick(event) {
       
        const userId = this.$route.params.userId
        this.post.date = await  moment().format('MMMM Do YYYY, h:mm:ss a')
        console.log(this.post.date)
        await insertPost(userId,this.post)
        alert("post added to your feed")
        console.log('you are good!')
        await this.$router.back()
    
    }
      
    }
  }
</script>
