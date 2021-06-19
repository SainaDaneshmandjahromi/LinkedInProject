<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// for sample
import { getAllUsers, insertUser } from '@/db/user/users'

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
