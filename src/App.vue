<template>
  <section>
    <app-navigator></app-navigator>
    <router-view></router-view>
  </section>
</template>

<script>
// for sample
// import { getAllUsers, insertUser } from '@/db/user/users'
import AppNavigator from '@/components/AppNavigator'

export default {
  name: 'app',
  components: {
    AppNavigator
  },
  // async created() {
  //   getAllUsers().then((data) =>{
  //     console.log(data)
  //   })
  //   await insertUser(user)
  // }
}
</script>
