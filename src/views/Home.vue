<template>
  <div class="px-3">
    <h1>Counter: {{ counter }}</h1>
    <b-button class="mb-2" variant="outline-primary" @click="increase">Increase</b-button>
    <!--    <router-link to="/about">Go to About</router-link>-->
    <div v-for="p in products" :key="p.id">
      <p>id: {{ p.id }}</p>
      <p>name: {{ p.name }}</p>
    </div>
  </div>
</template>

<script>
import { queryAllProduct, insertProduct } from '@/utils/db'

export default {
  name: 'Home',
  data: () => ({
    counter: 0,
    products: []
  }),
  methods: {
    increase() {
      this.counter++
      let product = {
        id: this.counter,
        name: 'test' + this.counter
      }
      insertProduct(product).then(() => {
        this.fetch()
      })
    },
    fetch(){
      queryAllProduct().then(data => {
        this.products = data
      })
    }
  },
  mounted () {
    this.fetch()
  },
}
</script>
