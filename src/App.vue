<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// for sample
// import { getAllUsers} from '@/db/users'

export default {
  name: 'app',
  // created() {
  //   getAllUsers().then((data) =>{
  //     console.log(data)
  //   })
  // }
}
</script>
