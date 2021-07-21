<template>
  <div>
    <b-card>
      <h5 class="font-weight-normal">Add Favorite</h5>
      <b-input class="font-weight-normal mt-4" v-model="item.content"></b-input>
      <b-button class="mt-3" block variant="success" @click="addItem">Add</b-button>
    </b-card>

    <h4 class="my-4">Users Favorites:</h4>
    <b-card
      class="mt-2"
      v-for="(favorite, i) in favorites"
      :key="favorite.id"
    >
      <b-input class="font-weight-normal" v-model="favorite.content"></b-input>

      <b-row no-gutters class="mt-4">
        <b-col cols="auto">
          <b-button variant="info" @click="updateItem(favorite.id, i)">Update</b-button>
        </b-col>
        <b-col cols="auto" class="ml-1">
          <b-button variant="danger" @click="deleteItem(favorite.id)">Delete</b-button>
        </b-col>
      </b-row>

    </b-card>

  </div>
</template>

<script>
import { getFavoritesByUserId, insertFavorite, updateFavorite, deleteFavorite } from '../../db/user/favorites'

export default {
  name: 'EditFavorites',
  data: () => ({
    item: {
      userId: '',
      content: '',
    },
    favorites: []
  }),
  methods: {
    async addItem() {
      if (this.item.content === '') return // ignore empty item
      await insertFavorite(this.item)
      await this.fetchItems()
      this.item.content = ''
    },
    async updateItem(id, i) {
      if (this.favorites[i].content === '') {
        await this.deleteItem(id)
        return
      }
      await updateFavorite(id, this.favorites[i])
    },
    async deleteItem(id) {
      await deleteFavorite(id)
      this.favorites = this.favorites.filter(i => i.id !== id)
    },
    async fetchItems() {
      this.favorites = await getFavoritesByUserId(this.$route.params.userId)
    }
  },
  async mounted() {
    this.item.userId = this.$route.params.userId
    await this.fetchItems()
  }
}
</script>
