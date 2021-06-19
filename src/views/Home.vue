<template>
  <b-container>
    <b-card class="mx-5 mt-5">

      <b-row class="justify-content-center mb-3">
        <b-col cols="auto">
          <h4 class="font-weight-light ">Add User Form</h4>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col sm="3">
          <label>First Name</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="firstName" type="text"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="justify-content-center mt-2">
        <b-col sm="3">
          <label>Last Name</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="lastName" type="text"></b-form-input>
        </b-col>
      </b-row>

      <b-button :disabled="allowAddUser" block class="mt-3" variant="primary" @click="addUser">Add</b-button>
    </b-card>

    <b-card class="mx-5 mt-2">

      <p>Users List:</p>

      <b-card v-for="user in users" :key="user.id">
        <p>Id: {{ user.id }}</p>
        <p>FirstName: {{ user.firstName }}</p>
        <p>LastName: {{ user.lastName }}</p>
      </b-card>

    </b-card>

  </b-container>
</template>

<script>
import { getAllUsers, insertUser } from '@/db/users'

export default {
  name: 'Home',
  data: () => ({
    firstName: '',
    lastName: '',
    users: []
  }),
  methods: {
    addUser() {
      let user = {
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.firstName = ''
      this.lastName = ''
      insertUser(user).then(() => {
        this.fetchAllUsers()
      })
    },
    fetchAllUsers() {
      getAllUsers().then(data => {
        this.users = data
      })
    }
  },
  computed: {
    allowAddUser() {
      return this.firstName === '' && this.lastName === ''
    }
  },
  mounted() {
    this.fetchAllUsers()
  },
}
</script>
