<template>
  <section>
    <h4 class="mb-3">Similar Users:</h4>
    <b-card
      v-for="user in similarUsers"
      :key="user.id"
      class="mt-2"
    >
      <b-row>
        <b-col cols="auto">
          <b-avatar :text="user.avatar" size="50" variant="light"></b-avatar>
        </b-col>
        <b-col cols="auto" class="mt-3">
          <h5 class="font-weight-normal text-capitalize">{{ user.username }}</h5>
          <h6 class="font-weight-light">{{ user.intro }}</h6>
        </b-col>
      </b-row>
      <!--todo need fix-->
      <b-row class="justify-content-end mr-1">
        <b-button
          @click="goToProfile(user.id)"
        >Go to profile
        </b-button>
      </b-row>
    </b-card>
  </section>
</template>

<script>
import { getUsersThatUsernameLike } from '../../db/user/users'

export default {
  name: 'UserSearch',
  data: () => ({
    similarUsers: []
  }),
  methods: {
    goToProfile(userId) {
      this.$router.push(`/user/${this.$route.params.userId}/anonymous-profile/${userId}`)
    },
  },
  async mounted() {
    this.similarUsers = await getUsersThatUsernameLike(this.$route.params.username)
  }
}
</script>
