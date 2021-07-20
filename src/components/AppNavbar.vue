<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">

    <b-navbar-brand href="#">
      <b-icon scale="1.6" icon="linkedin"></b-icon>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav>
        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search User"
            v-model="searchedUsernamePattern"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" @click="search">Search</b-button>

          <b-modal id="empty-username-search" hide-footer>
            <template #modal-title>
              Attention
            </template>
            <div class="d-block text-center">
              <h3 class="font-weight-normal">Do you know, you should type some username then press search button?🤔</h3>
            </div>
            <b-button
              class="mt-5"
              variant="warning"
              block
              @click="$bvModal.hide('empty-username-search')"
            >
              Ohhh myyy god! Seriously!?!😱
            </b-button>
          </b-modal>

        </b-nav-form>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="`/user/${this.$route.params.userId}`">Home</b-nav-item>
        <b-nav-item :to="`/user/${this.$route.params.userId}/connection`">My Network</b-nav-item>
        <b-nav-item :to="`/user/${this.$route.params.userId}/chat`">Messaging</b-nav-item>
        <b-nav-item :to="`/user/${this.$route.params.userId}/notifications`">Notifications</b-nav-item>
        <b-nav-item :to="`/user/${this.$route.params.userId}/profile`">Profile</b-nav-item>
        <b-nav-item :to="`/`">Logout</b-nav-item>
      </b-navbar-nav>

    </b-collapse>

  </b-navbar>
</template>

<script>
export default {
  name: 'AppNavbar',
  data: () => ({
    searchedUsernamePattern: ''
  }),
  methods: {
    search() {
      if (this.searchedUsernamePattern !== '') {
        // todo: need fix for other routes except home
        this.$router.push(`${this.$route.params.userId}/search/${this.searchedUsernamePattern}`)
      } else {
        this.$bvModal.show('empty-username-search')
      }
    }
  }
}
</script>
