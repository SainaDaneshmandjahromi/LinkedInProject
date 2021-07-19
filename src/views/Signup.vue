<template>
  <b-card class="mx-5 mt-3">

    <label>Username:</label>
    <b-form-input
      v-model="user.username"
      type="text"
      trim
    ></b-form-input>

    <label class="mt-2">Password:</label>
    <b-form-input
      v-model="user.password"
      type="password"
      trim
    ></b-form-input>

    <label class="mt-2">Birthday:</label>
    <b-form-input
      v-model="user.birthday"
      type="date"
      trim
    ></b-form-input>

    <b-button
      :disabled="disallowSignup"
      block
      class="mt-3"
      variant="success"
      @click="signup"
    >
      Signup
    </b-button>

  </b-card>
</template>

<script>
import { getUserByUsername, insertUser } from '@/db/user/users'

export default {
  name: 'Signup',
  data: () => ({
    user: {
      username: '',
      password: '',
      avatar: '',
      birthday: '',
    },
    avatars: [
      ':)',
      '^-^',
      '-_-',
      'O_o',
      'XD',
      ':D',
      '>.<',
      ':P'
    ]
  }),
  methods: {
    async signup() {
      const takenUser = await getUserByUsername(this.user.username)
      if (takenUser) {
        console.log('this username is already taken')
        return
      }
      this.user.username = this.user.username.toLowerCase()
      this.user.avatar = this.avatars[Math.floor(Math.random() * this.avatars.length)]
      if (this.user.birthday === '') this.user.birthday = null

      await insertUser(this.user)
      const user = await getUserByUsername(this.user.username)
      await this.$router.push(`/user/${user.id}`)
    }
  },
  computed: {
    disallowSignup() {
      return this.user.username === '' || this.user.password === ''
    }
  },
}
</script>
