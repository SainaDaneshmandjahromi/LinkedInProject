<template>
  <div>
    <b-card>
      <h5 class="font-weight-normal">Add Accomplishment</h5>
      <b-input class="font-weight-normal mt-4" v-model="item.name"></b-input>
      <b-button class="mt-3" block variant="success" @click="addItem">Add</b-button>
    </b-card>

    <h4 class="my-4">Users Accomplishments:</h4>
    <b-card
      class="mt-2"
      v-for="(accomplishment, i) in accomplishments"
      :key="accomplishment.id"
    >
      <b-input class="font-weight-normal" v-model="accomplishment.name"></b-input>

      <b-row no-gutters class="mt-4">
        <b-col cols="auto">
          <b-button variant="info" @click="updateItem(accomplishment.id, i)">Update</b-button>
        </b-col>
        <b-col cols="auto" class="ml-1">
          <b-button variant="danger" @click="deleteItem(accomplishment.id)">Delete</b-button>
        </b-col>
      </b-row>

    </b-card>

  </div>
</template>

<script>
import {
  getAccomplishmentsByUserId,
  insertAccomplishment,
  updateAccomplishment,
  deleteAccomplishment
} from '../../db/user/accomplishments'

export default {
  name: 'EditAccomplishments',
  data: () => ({
    item: {
      userId: '',
      name: '',
    },
    accomplishments: []
  }),
  methods: {
    async addItem() {
      await insertAccomplishment(this.item)
      await this.fetchItems()
      this.item.name = ''
    },
    async updateItem(id, i) {
      if (this.accomplishments[i].content === '') {
        await this.deleteItem(id)
        return
      }
      await updateAccomplishment(id, this.accomplishments[i])
    },
    async deleteItem(id) {
      await deleteAccomplishment(id)
      this.accomplishments = this.accomplishments.filter(i => i.id !== id)
    },
    async fetchItems() {
      this.accomplishments = await getAccomplishmentsByUserId(this.$route.params.userId)
    }
  },
  async mounted() {
    this.item.userId = this.$route.params.userId
    await this.fetchItems()
  }
}
</script>
