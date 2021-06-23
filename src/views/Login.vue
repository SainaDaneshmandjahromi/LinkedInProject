<template>
  <section>
    <b-card class="mx-5">

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

      <b-button
        :disabled="allowLogin"
        block
        class="mt-3"
        variant="success"
        @click="login"
      >Login
      </b-button>

    </b-card>

  </section>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    user: {
      username: '',
      password: ''
    }
  }),
  methods: {
    login() {

    }
  },
  computed: {
    allowLogin() {
      return this.username === '' || this.password === ''
    }
  },
}
</script>
