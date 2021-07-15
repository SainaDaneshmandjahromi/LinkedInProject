<template>
  <section>
    <p>Loaded Id: {{ user.id }} </p>
    <p>Loaded username: {{ user.username }} </p>
  </section>
</template>

<script>
import { getUserById } from '@/db/user/users'

export default {
  name: 'UserProfile',
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
