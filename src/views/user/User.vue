<template>
  <section>
    <app-navbar></app-navbar>
    <b-container fluid class="pt-3">
      <router-view></router-view>
    </b-container>
  </section>
</template>

<script>
import AppNavbar from '@/components/AppNavbar'

export default {
  name: 'User',
  components: {
    AppNavbar
  }
}
</script>
