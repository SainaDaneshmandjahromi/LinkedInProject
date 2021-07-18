  
<template>
<div>
  <div :key="post.id" v-for="post in posts.slice().reverse()">
    <user-post
      :post="post"
    />
    
  </div>
</div>
</template>

<script>
import UserPost from '../../components/UserPost.vue'
import {getFeedPosts} from '@/db/posting/posts'
// import { getPostComments} from '@/db/posting/comments'
import{getUserById} from '@/db/user/users'
export default {
  name: 'posts',
  data: () => ({
    user: {
      id: '',
      username: '',
    },
    posts: []
  }),
 
  components: {
    UserPost
  }, 
  async created() {

        console.log(this.$route.params.userId)
        this.user  = await getUserById(this.$route.params.userId)
        this.posts = await getFeedPosts(this.$route.params.userId)
        // alert("user posts")
        console.log(this.posts)
    }
}
</script>