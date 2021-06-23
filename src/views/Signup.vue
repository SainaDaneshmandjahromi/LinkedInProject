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

      <label class="mt-2">Birthday:</label>
      <b-form-input
        v-model="user.password"
        type="date"
        trim
      ></b-form-input>

      <b-button
        :disabled="allowSignup"
        block
        class="mt-3"
        variant="success"
        @click="signup"
      >Signup</b-button>

    </b-card>

  </section>
</template>

<script>
export default {
  name: 'Signup',
  data: () => ({
    user: {
      username: '',
      password: ''
    }
  }),
  methods: {
    signup(){

    }
  },
  computed: {
    allowSignup() {
      return this.username === '' || this.password === ''
    }
  },
}
</script>
