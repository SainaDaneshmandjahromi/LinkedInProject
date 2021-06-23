<template>
  <section>
    <b-card no-body class="mx-2 mb-5">
      <b-row class="justify-content-between align-items-center">
        <b-col cols="auto">
          <b-button @click="$router.back()" variant="light">
            <b-icon icon="arrow-left"></b-icon>
          </b-button>
        </b-col>

        <b-col cols="auto">
          <h5 class="font-weight-light" style="margin-top: 5px;">Current Route: {{ this.$route.fullPath }}</h5>
        </b-col>

        <b-col cols="auto">
          <b-button @click="$router.forward()" variant="light">
            <b-icon icon="arrow-right"></b-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <router-view></router-view>
  </section>
</template>

<script>
// for sample
// import { getAllUsers, insertUser } from '@/db/user/users'

export default {
  name: 'app',
  // async created() {
  //   getAllUsers().then((data) =>{
  //     console.log(data)
  //   })
  //   await insertUser(user)
  // }
}
</script>
