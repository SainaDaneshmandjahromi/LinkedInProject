<template>
  <b-card class="mx-5 mt-3">

    <label>Username:</label>
    <b-form-input
      v-model="username"
      type="text"
      trim
    ></b-form-input>

    <label class="mt-2">Password:</label>
    <b-form-input
      v-model="password"
      type="password"
      trim
    ></b-form-input>

    <b-button
      :disabled="disallowLogin"
      block
      class="mt-3"
      variant="success"
      @click="login"
    >
      Login
    </b-button>

  </b-card>
</template>

<script>
import { getUserByUsername } from '@/db/user/users'

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    async login() {
      this.username = this.username.toLowerCase()
      const user = await getUserByUsername(this.username)
      console.log(user)

      if (!user) {
        console.log('Cannot find user with username ' + this.username)
        return
      }

      if (user.password === this.password) {
        console.log('Logged in successfully')
        await this.$router.push(`/user/${user.id}`)
      } else {
        console.log('invalid password')
      }

    }
  },
  computed: {
    disallowLogin() {
      return this.username === '' || this.password === ''
    }
  },
}
</script>
