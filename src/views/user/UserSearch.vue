<template>
  <section>

    <h3 class="mt-4 mb-5 text-center font-weight-light">Search Results For: {{ $route.params.pattern }}</h3>


    <b-row class="justify-content-center mb-3">
      <b-form-checkbox-group v-model="searchByOptions">

        <b-form-checkbox
          value="searchByUsername"
        >
          Search by username
        </b-form-checkbox>

        <b-form-checkbox
          value="searchByLocation"
        >
          Search by location
        </b-form-checkbox>

        <b-form-checkbox
          value="searchByLanguages"
        >
          Search by languages
        </b-form-checkbox>

        <b-form-checkbox
          value="searchByCompany"
        >
          Search by company
        </b-form-checkbox>

      </b-form-checkbox-group>
    </b-row>

    <b-card v-if="searchByOptions.includes('searchByUsername')">
      <h4 class="mb-3">Users with similar usernames:</h4>

      <template v-if="similarUsernames.length > 0">

        <searched-user
          v-for="user in similarUsernames"
          :key="user.id"
          :user="user"
        ></searched-user>

      </template>

      <template v-else>
        <p>No Result Found</p>
      </template>

    </b-card>

    <b-card class="mt-3" v-if="searchByOptions.includes('searchByLocation')">
      <h4 class="mb-3">Users with similar locations:</h4>

      <template v-if="similarUserLocations.length > 0">

        <searched-user
          v-for="user in similarUserLocations"
          :key="user.id"
          :user="user"
        ></searched-user>

      </template>

      <template v-else>
        <p>No Result Found</p>
      </template>

    </b-card>

    <b-card class="mt-3" v-if="searchByOptions.includes('searchByLanguages')">
      <h4 class="mb-3">Users with similar languages:</h4>

      <template v-if="similarUserLanguages.length > 0">

        <searched-user
          v-for="user in similarUserLanguages"
          :key="user.id"
          :user="user"
        ></searched-user>

      </template>

      <template v-else>
        <p>No Result Found</p>
      </template>

    </b-card>

    <b-card class="mt-3 mb-2" v-if="searchByOptions.includes('searchByCompany')">
      <h4 class="mb-3">Users with similar companies:</h4>

      <template v-if="similarUserCompanies.length > 0">

        <searched-user
          v-for="user in similarUserCompanies"
          :key="user.id"
          :user="user"
        ></searched-user>

      </template>

      <template v-else>
        <p>No Result Found</p>
      </template>

    </b-card>

  </section>
</template>

<script>
import { getUsersThatCurrentCompanyLike, getUsersThatLocationLike, getUsersThatUsernameLike } from '../../db/user/users'
import SearchedUser from '../../components/SearchedUser'
import { getUsersThatLanguagesLike } from '../../db/user/userLanguage'

export default {
  name: 'UserSearch',
  components: {SearchedUser},
  data: () => ({
    searchByOptions: ['searchByUsername', 'searchByLocation', 'searchByLanguages', 'searchByCompany'],

    similarUsernames: [],
    similarUserLocations: [],
    similarUserCompanies: [],
    similarUserLanguages: [],
  }),
  async mounted() {
    this.similarUsernames = await getUsersThatUsernameLike(this.$route.params.pattern)
    this.similarUserLocations = await getUsersThatLocationLike(this.$route.params.pattern)
    this.similarUserCompanies = await getUsersThatCurrentCompanyLike(this.$route.params.pattern)
    this.similarUserLanguages = await getUsersThatLanguagesLike(this.$route.params.pattern)
    console.log(this.similarUserLanguages)
  }
}
</script>
