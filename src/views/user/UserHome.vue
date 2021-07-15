<template>
  <section>
    <h1>This user home!</h1>
    <br>
    <p>Loaded Id: {{ user.id }} </p>
    <p>Loaded username: {{ user.username }} </p>
    <b-button
      :to="`/user/${this.$route.params.userId}/newpost`"
      variant="danger"
    >Create New Post</b-button>
  </section>
</template>

<script>
import { getUserById } from '@/db/user/users'

export default {
  name: 'UserHome',
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
