  
<template>
<div>
  <div :key="post.id" v-for="post in posts">
    <user-post
      :post="post"
    />
    
  </div>
</div>
</template>

<script>
import UserPost from '../../components/UserPost.vue'
import {getUserPosts} from '@/db/posting/posts'
import { getPostComments} from '@/db/posting/comments'
import{getUserById} from '@/db/user/users'
export default {
  name: 'posts',
  data: () => ({
    user: {
      id: '',
      username: '',
    },
  }),
  props: {
    posts: Array,
  },
  components: {
    UserPost
  }, 
  async created() {

        console.log(this.$route.params.userId)
        this.user  = await getUserById(this.$route.params.userId)
        this.posts = await getUserPosts(this.$route.params.userId)
    }
}
</script>