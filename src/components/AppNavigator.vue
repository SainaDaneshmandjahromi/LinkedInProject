<template>
  <b-card no-body>
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
</template>

<script>
export default {
  name: 'AppNavigator'
}
</script>
