<template>
  <section>

    <b-card>

      <b-row class="justify-content-center">
        <b-avatar :text="user.avatar" size="150" variant="light"></b-avatar>
      </b-row>

      <b-row class="justify-content-center mt-4">
        <h2 class="text-capitalize">{{ user.username }}</h2>
      </b-row>

      <b-row v-if="user.intro" class="justify-content-center mt-2">
        <h6 class="font-weight-normal">{{ user.intro }}</h6>
      </b-row>

      <b-row v-if="user.location" class="justify-content-center mt-2">
        <h6 class="font-weight-normal">Lives in {{ user.location }}</h6>
      </b-row>

      <b-row v-if="user.birthday" class="justify-content-center mt-2">
        <h6 class="font-weight-normal">Born at {{ user.birthday }}</h6>
      </b-row>

      <b-row v-if="user.currentCompany" class="justify-content-center mt-2">
        <h6 class="font-weight-normal">Currently working at {{ user.currentCompany }}</h6>
      </b-row>

      <b-row v-if="languages.length > 0" class="justify-content-center mt-2">
        <span v-for="language in languages" :key="language.id" class="badge badge-info mr-1">
          {{ language.name }}
        </span>
      </b-row>

      <b-row v-if="!isAnonymous" class="justify-content-center mt-3">
        <b-button
          variant="outline-primary"
          :to="`/user/${this.$route.params.userId}/edit-profile`"
        >
          <b-icon icon="pencil"></b-icon>
          Edit Profile
        </b-button>
      </b-row>

    </b-card>

    <b-card v-if="user.about" class="mt-3">
      <h4 class="font-weight-normal mb-3">About</h4>
      <p>{{ user.about }}</p>
    </b-card>

    <b-card v-if="user.background" class="mt-3">
      <h4 class="font-weight-normal mb-3">Background</h4>
      <p>{{ user.background }}</p>
    </b-card>

    <b-card v-if="favorites.length > 0" class="mt-3">
      <h4 class="font-weight-normal mb-4">Favorites</h4>
      <b-card no-body v-for="favorite in favorites" :key="favorite.id" class="mb-2 px-3 pt-3">
        <p class="font-weight-light">{{ favorite.content }}</p>
      </b-card>
    </b-card>

    <b-card v-if="skills.length > 0" class="mt-3">
      <h4 class="font-weight-normal mb-3">Skills & endorsements</h4>
      <b-card no-body v-for="skill in skills" :key="skill.id" class="mb-2 px-3 pt-3">
        <p class="font-weight-light">{{ skill.name }}</p>
        <p v-if="skill.endorsedUsers.length > 0" class="font-weight-light">
          Endorsed by ({{ skill.endorsedUsers.length }}):
          <router-link v-for="endorsedUser in skill.endorsedUsers"
                       :key="endorsedUser.id"
                       :to="`anonymous-profile/${endorsedUser.id}`"
                       class="text-capitalize"
          >
            {{ endorsedUser.username }}
          </router-link>
        </p>
      </b-card>
    </b-card>

    <b-card v-if="accomplishments.length > 0" class="mt-3">
      <h4 class="font-weight-normal mb-3">Accomplishments</h4>
      <b-card no-body v-for="accomplishment in accomplishments" :key="accomplishment.id" class="mb-2 px-3 pt-3">
        <p class="font-weight-light">{{ accomplishment.name }}</p>
      </b-card>
    </b-card>

  </section>
</template>

<script>
import { getUserById } from '@/db/user/users'
import { getFavoritesByUserId } from '@/db/user/favorites'
import { getSkillsByUserId } from '@/db/user/skills'
import { getEndorsedUsersBySkillId } from '../../db/user/userEndorsedSkill'
import { getLanguagesByUserId } from '../../db/user/userLanguage'
import { getAccomplishmentsByUserId } from '../../db/user/accomplishments'

export default {
  name: 'UserProfile',
  data: () => ({
    isAnonymous: true,
    user: {
      id: '',
      username: '',
      avatar: '',
      birthday: '',
      intro: '',
      about: '',
      background: '',
      location: '',
      currentCompany: ''
    },
    languages: [],
    favorites: [],
    skills: [],
    accomplishments: []
  }),
  async mounted() {
    // fetch target user
    const userId = this.$route.params.userId
    const anonymousUserId = this.$route.params.anonymousUserId
    if (anonymousUserId) {
      this.isAnonymous = true
      this.user = await getUserById(anonymousUserId)
    } else {
      this.isAnonymous = false
      this.user = await getUserById(userId)
    }

    this.languages = await getLanguagesByUserId(this.user.id)
    this.favorites = await getFavoritesByUserId(this.user.id)

    const skills = await getSkillsByUserId(this.user.id)
    for (const skill of skills) {
      const endorsedUsers = await getEndorsedUsersBySkillId(skill.id)
      this.skills.push({
        ...skill,
        endorsedUsers
      })
    }

    this.accomplishments = await getAccomplishmentsByUserId(this.user.id)
  }
}
</script>
