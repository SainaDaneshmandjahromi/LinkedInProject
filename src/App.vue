<template>
  <section>
    <b-card no-body class="mx-2 mb-3">
      <b-row class="justify-content-between align-items-center">
        <b-col cols="auto">
          <b-button @click="$router.back()" variant="light" style="outline: none; box-shadow: none;">
            <b-icon icon="arrow-left"></b-icon>
          </b-button>
        </b-col>

        <b-col cols="auto">
          <h5 class="font-weight-light" style="margin-top: 5px;">
            Current Route: {{ this.$route.fullPath }} - Route Name: {{ this.$route.name }}
          </h5>
        </b-col>

        <b-col cols="auto">
          <b-button @click="$router.forward()" variant="light" style="outline: none; box-shadow: none;">
            <b-icon icon="arrow-right"></b-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-card>

    <b-card class="mx-2">
      <router-view></router-view>
    </b-card>

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
