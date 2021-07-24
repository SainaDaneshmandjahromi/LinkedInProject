<template>
  <div>
    <div class="mt-2" :key="post.id" v-for="post in posts">
      <user-post
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import UserPost from '../../components/UserPost.vue'
import { getUserPosts, getUserFavoritePosts } from '@/db/posting/posts' 
// import { getPostComments} from '@/db/posting/comments'
import { getUserById } from '@/db/user/users'

export default {
  name: 'Favorits',
  data: () => ({
    user: {
      id: '',
      username: '',
    },
     posts:[],
  }),

  components: {
    UserPost
  },
  async created() {

    console.log(this.$route.params.userId)
    this.user = await getUserById(this.$route.params.userId)

    this.posts = await  getUserFavoritePosts( this.$route.params.userId)
  }
}
</script>