<template>
  <b-card class="mx-5 mt-3">

    <b-row class="justify-content-center">
      <b-avatar :text="user.avatar" size="150" variant="light"></b-avatar>
    </b-row>

    <label>Username:</label>
    <b-form-input
      id="input-username"
      v-model="user.username"
      type="text"
      trim
      @input="isUsernameAvailable"
      :state="isUsernameValid"
    ></b-form-input>
    <b-form-invalid-feedback id="input-username-feedback">
      This username is not available
    </b-form-invalid-feedback>

    <label class="mt-2">Password:</label>
    <b-form-input
      v-model="user.password"
      type="text"
      trim
      :state="user.password.length > 0"
    ></b-form-input>
    <b-form-invalid-feedback id="input-avatar-feedback">
      Password is required
    </b-form-invalid-feedback>

    <label class="mt-2">Avatar:</label>
    <b-form-input
      id="input-avatar"
      v-model="user.avatar"
      type="text"
      trim
      :state="user.avatar.length <= 3"
    ></b-form-input>
    <b-form-invalid-feedback id="input-avatar-feedback">
      Maximum characters for avatar is 3
    </b-form-invalid-feedback>

    <label class="mt-2">Introduction:</label>
    <b-form-input
      v-model="user.intro"
      type="text"
      trim
    ></b-form-input>

    <label class="mt-2">Location:</label>
    <b-form-input
      v-model="user.location"
      type="text"
      trim
    ></b-form-input>

    <label class="mt-2">Birthday:</label>
    <b-form-input
      v-model="user.birthday"
      type="date"
      trim
    ></b-form-input>

    <label class="mt-2">Current Company:</label>
    <b-form-input
      v-model="user.currentCompany"
      type="text"
      trim
    ></b-form-input>

    <label class="mt-2">Supported Languages:</label>
    <b-form-checkbox-group v-model="selectedLanguages">
      <b-form-checkbox
        v-for="languageOption in languageOptions"
        :key="languageOption.id"
        :value="languageOption"
      >
        {{ languageOption.name }}
      </b-form-checkbox>
    </b-form-checkbox-group>

    <label class="mt-2">About:</label>
    <b-form-textarea
      v-model="user.about"
      type="text"
      trim
      rows="4"
      no-resize
    ></b-form-textarea>

    <label class="mt-2">Background:</label>
    <b-form-textarea
      v-model="user.background"
      type="text"
      trim
      rows="4"
      no-resize
    ></b-form-textarea>

    <b-button
      :disabled="disallowUpdate"
      block
      class="mt-3"
      variant="success"
      @click="updateUser"
    >
      Update User
    </b-button>

  </b-card>
</template>

<script>
import { getUserById, getUserByUsername, updateUser } from '../../db/user/users'
import { deleteUserLanguage, getLanguagesByUserId, insertUserLanguage } from '../../db/user/userLanguage'
import { getAllLanguages } from '../../db/user/languages'
import { getAccomplishmentsByUserId } from '../../db/user/accomplishments'
import { getFavoritesByUserId } from '../../db/user/favorites'
import { getSkillsByUserId } from '../../db/user/skills'

export default {
  name: 'EditUserProfile',
  data: () => ({
    isUsernameValid: true,
    userCurrentUsername: '',
    user: {
      id: '',
      username: '',
      password: '',
      avatar: '',
      birthday: '',
      intro: '',
      about: '',
      background: '',
      location: '',
      currentCompany: ''
    },
    languageOptions: [],
    userLanguages: [],
    selectedLanguages: [],
    favorites: [],
    skills: [],
    accomplishments: []
  }),
  computed: {
    disallowUpdate() {
      return this.user.username === '' || this.user.password === ''
    }
  },
  methods: {
    async isUsernameAvailable() {
      if (this.userCurrentUsername === this.user.username) {
        this.isUsernameValid = true
        return
      }
      const takenUser = await getUserByUsername(this.user.username)
      this.isUsernameValid = !takenUser && this.user.username !== ''
    },
    async updateUser() {
      this.user.username = this.user.username.toLowerCase()
      await updateUser(this.user.id, this.user)

      // insert or delete user languages
      for (const lang of this.selectedLanguages) {
        if (this.userLanguages.includes(lang)) {
          this.userLanguages = this.userLanguages.filter(l => lang.id !== l.id)
        } else {
          await insertUserLanguage(this.user.id, lang.id)
        }
      }
      for (const lang of this.userLanguages) {
        await deleteUserLanguage(this.user.id, lang.id)
      }

      this.$router.back()
    }
  },
  async mounted() {
    this.user = await getUserById(this.$route.params.userId)
    this.userCurrentUsername = this.user.username

    this.userLanguages = await getLanguagesByUserId(this.user.id)
    this.selectedLanguages = this.userLanguages

    this.favorites = await getFavoritesByUserId(this.user.id)
    this.skills = await getSkillsByUserId(this.user.id)
    this.accomplishments = await getAccomplishmentsByUserId(this.user.id)

    this.languageOptions = await getAllLanguages()
  }
}
</script>
