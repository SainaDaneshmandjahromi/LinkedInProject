<template>
  <b-container>

    <b-row class="justify-content-center mt-5">
      <b-col cols="auto">
        <b-img src="@/assets/linkedin.png"></b-img>
      </b-col>
    </b-row>

    <b-card class="mt-5">
      <b-row class="justify-content-center">
        <h4 class="font-weight-light ">Welcome, what's up?</h4>
      </b-row>

      <b-row class="justify-content-between mt-2">
        <b-col>
          <b-button to="/signup" block variant="outline-dark">Signup</b-button>
        </b-col>
        <b-col>
          <b-button to="/login" block variant="dark">Login</b-button>
        </b-col>
      </b-row>
    </b-card>

  </b-container>
</template>

<script>

export default {
  name: 'Home',
}
</script>
