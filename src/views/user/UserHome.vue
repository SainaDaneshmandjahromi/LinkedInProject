<template>
  <b-container fluid>
    <p>Loaded Id: {{ user.id }} </p>
    <p>Loaded username: {{ user.username }} </p>
  </b-container>
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