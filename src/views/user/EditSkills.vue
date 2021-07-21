<template>
  <div>
    <b-card>
      <h5 class="font-weight-normal">Add Skill</h5>
      <b-input class="font-weight-normal mt-4" v-model="item.name"></b-input>
      <b-button class="mt-3" block variant="success" @click="addItem">Add</b-button>
    </b-card>

    <h4 class="my-4">Users Skills:</h4>
    <b-card
      class="mt-2"
      v-for="(skill, i) in skills"
      :key="skill.id"
    >
      <b-input class="font-weight-normal" v-model="skill.name"></b-input>

      <b-row no-gutters class="mt-4">
        <b-col cols="auto">
          <b-button variant="info" @click="updateItem(skill.id, i)">Update</b-button>
        </b-col>
        <b-col cols="auto" class="ml-1">
          <b-button variant="danger" @click="deleteItem(skill.id)">Delete</b-button>
        </b-col>
      </b-row>

    </b-card>

  </div>
</template>

<script>
import { getSkillsByUserId, insertSkill, updateSkill, deleteSkill } from '../../db/user/skills'

export default {
  name: 'EditSkills',
  data: () => ({
    item: {
      userId: '',
      name: '',
    },
    skills: []
  }),
  methods: {
    async addItem() {
      if (this.item.name === '') return // ignore empty item
      await insertSkill(this.item)
      await this.fetchItems()
      this.item.name = ''
    },
    async updateItem(id, i) {
      if (this.skills[i].content === '') {
        await this.deleteItem(id)
        return
      }
      await updateSkill(id, this.skills[i])
    },
    async deleteItem(id) {
      await deleteSkill(id)
      this.skills = this.skills.filter(i => i.id !== id)
    },
    async fetchItems() {
      this.skills = await getSkillsByUserId(this.$route.params.userId)
    }
  },
  async mounted() {
    this.item.userId = this.$route.params.userId
    await this.fetchItems()
  }
}
</script>
