<template>
  <section>
    <app-navigator></app-navigator>
    <router-view :key="$route.path"></router-view>
  </section>
</template>

<script>
import AppNavigator from '@/components/AppNavigator'

export default {
  name: 'app',
  components: {
    AppNavigator
  },
}
</script>
