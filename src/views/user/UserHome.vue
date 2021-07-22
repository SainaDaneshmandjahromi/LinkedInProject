<template>
  <section>

    <b-card>
      <b-row class="justify-content-center">
        <h1 class="mt-2 font-weight-light">Welcome {{ user.username }}</h1>
      </b-row>

      <b-row class="justify-content-center mt-4">
        <b-button
          class="mb-3"
          :to="`/user/${this.$route.params.userId}/newpost`"
          variant="outline-primary"
        >
          Create New Post
        </b-button>
      </b-row>
    </b-card>

    <user-posts class="mt-3"></user-posts>

  </section>
</template>

<script>
import { getUserById } from '@/db/user/users'
import UserPosts from '../../components/UserPosts'

export default {
  name: 'UserHome',
  components: {
    UserPosts
  },
  data: () => ({
    user: {
      id: '',
      username: '',
    }
  }),
  async mounted() {
    this.user = await getUserById(this.$route.params.userId)
  }
}
</script>
