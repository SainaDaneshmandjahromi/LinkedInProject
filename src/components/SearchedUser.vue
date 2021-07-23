<template>
  <b-card
    class="mt-2"
  >
    <b-row>
      <b-col cols="auto">
        <b-avatar :text="user.avatar" size="50" variant="light"></b-avatar>
      </b-col>

      <b-col cols="auto" class="mt-3">
        <h5 class="font-weight-normal text-capitalize">{{ user.username }}</h5>
        <h6 v-if="user.intro" class="font-weight-normal">{{ user.intro }}</h6>
        <h6 v-if="user.location" class="font-weight-normal">Lives in {{ user.location }}</h6>
        <h6 v-if="user.currentCompany" class="font-weight-normal">Currently working at {{ user.currentCompany }}</h6>

        <template v-if="languages.length > 0">
          <span v-for="language in languages" :key="language.id" class="badge badge-info mr-1">
            {{ language.name }}
          </span>
        </template>

      </b-col>

    </b-row>

    <b-row class="justify-content-end mr-1">
      <b-button
        @click="goToProfile(user.id)"
      >Go to profile
      </b-button>
    </b-row>
  </b-card>
</template>

<script>
import { getLanguagesByUserId } from '../db/user/userLanguage'

export default {
  name: 'SearchedUser',
  props: {
    user: {
      type: Object,
      default: () => {
      },
    },
  },
  data: () => ({
    languages: []
  }),
  methods: {
    goToProfile(userId) {
      this.$router.push(`/user/${this.$route.params.userId}/anonymous-profile/${userId}`)
    },
  },
  async mounted() {
    this.languages = await getLanguagesByUserId(this.user.id)
  }
}
</script>
