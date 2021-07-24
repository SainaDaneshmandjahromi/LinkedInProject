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
      <b-row v-else-if="!connected && !invitationSend" class="justify-content-center mt-3">
        <b-button
          variant="outline-primary"
          @click="sendInvitation"
        >
          <b-icon icon="envelope"></b-icon>
          Send Invitation
        </b-button>
      </b-row>
      <b-row v-else-if="invitationSend" class="justify-content-center mt-3">
        <h4>
          <b-badge pill class="font-weight-light" variant="info">
            <b-icon icon="check2"></b-icon>
            Invitation sent
          </b-badge>
        </h4>
      </b-row>
      <b-row v-else class="justify-content-center mt-3">
        <h4>
          <b-badge pill class="font-weight-light" variant="success">
            <b-icon icon="check2-all"></b-icon>
            Connected
          </b-badge>
        </h4>
      </b-row>
    
    <b-row class="justify-content-center mt-3">
        <b-col cols="auto" v-if="isAnonymous">
          <b-button
            variant="outline-secondary"
            :to="`/user/${loggedInUser.id}/${user.id}/ThisUserPosts`"
          >
            <b-icon icon="file-post"></b-icon>
            Posts
          </b-button>
        </b-col>
        <b-col cols="auto" v-if="isAnonymous">
          <b-button
            variant="outline-secondary"
            :to="`/user/${loggedInUser.id}/${user.id}/Favorites`"
          >
            <b-icon icon="star-fill"></b-icon>
            Favorties Posts
          </b-button>
        </b-col>
    </b-row>

    <b-row class="justify-content-center mt-3">
        <b-col cols="auto" v-if="!isAnonymous">
          <b-button
            variant="outline-secondary"
            @click="$router.push(`/user/${$route.params.userId}/ThisUserPosts`)"
          >
            <b-icon icon="file-post"></b-icon>
            Posts
          </b-button>
        </b-col>
        <b-col cols="auto" v-if="!isAnonymous">
          <b-button
            variant="outline-secondary"
            @click="$router.push(`/user/${$route.params.userId}/Favorites`)"
          >
            <b-icon icon="star-fill"></b-icon>
            Favorties Posts
          </b-button>
        </b-col>
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

    <b-card v-if="!isAnonymous || favorites.length > 0" class="mt-3">
      <h4 class="font-weight-normal mb-4">Favorites</h4>
      <b-card no-body v-for="favorite in favorites" :key="favorite.id" class="mb-2 px-3 pt-3">
        <p class="font-weight-normal">{{ favorite.content }}</p>
      </b-card>

      <b-button
        v-if="!isAnonymous"
        variant="primary"
        class="mt-2"
        no-prefetch
        to="edit-favorites"
      >
        Edit
      </b-button>
    </b-card>

    <b-card v-if="!isAnonymous || skills.length > 0" class="mt-3">
      <h4 class="font-weight-normal mb-3">Skills & Endorsements</h4>
      <b-card v-for="(skill, i) in skills" :key="skill.id" class="mb-2">
        <p class="font-weight-normal">{{ skill.name }}</p>
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

        <b-button
          v-if="isAnonymous && !skill.endorsedUsers.find(e => e.id === loggedInUser.id)"
          variant="success"
          class="mt-2"
          @click="endorse(skill.id, i)"
        >
          <b-icon icon="patch-check"></b-icon>
          Endorse
        </b-button>
        <b-button
          v-if="isAnonymous && skill.endorsedUsers.find(e => e.id === loggedInUser.id)"
          variant="danger"
          class="mt-2"
          @click="undoEndorse(skill.id, i)"
        >
          <b-icon icon="patch-minus"></b-icon>
          Undo Endorse
        </b-button>
      </b-card>

      <b-button
        v-if="!isAnonymous"
        variant="primary"
        class="mt-2"
        no-prefetch
        to="edit-skills"
      >
        Edit
      </b-button>
    </b-card>

    <b-card v-if="!isAnonymous || accomplishments.length > 0" class="mt-3">
      <h4 class="font-weight-normal mb-3">Accomplishments</h4>
      <b-card no-body v-for="accomplishment in accomplishments" :key="accomplishment.id" class="mb-2 px-3 pt-3">
        <p class="font-weight-normal">{{ accomplishment.name }}</p>
      </b-card>

      <b-button
        v-if="!isAnonymous"
        variant="primary"
        class="mt-2"
        to="edit-accomplishments"
      >
        Edit
      </b-button>
    </b-card>

  </section>
</template>

<script>
import { getUserById } from '@/db/user/users'
import { getFavoritesByUserId } from '@/db/user/favorites'
import { getSkillsByUserId } from '@/db/user/skills'
import {
  deleteUserEndorsedSkill,
  getEndorsedUsersBySkillId,
  insertUserEndorsedSkill
} from '../../db/user/userEndorsedSkill'
import { getLanguagesByUserId } from '../../db/user/userLanguage'
import { getAccomplishmentsByUserId } from '../../db/user/accomplishments'
import { checkConnectionExists } from '../../db/user/connections'
import { checkInvitationExists, sendInvitation } from '../../db/user/invitations'
import { insertNotification, TYPE_ENDORSE, TYPE_PROFILE_SEEN } from '../../db/user/notifications'

export default {
  name: 'UserProfile',
  data: () => ({
    isAnonymous: true,
    connected: false,
    invitationSend: false,
    loggedInUser: {
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
  methods: {
    async endorse(skillId, i) {
      await insertUserEndorsedSkill(this.$route.params.userId, skillId)
      this.skills[i].endorsedUsers.push(this.loggedInUser)

      await insertNotification({
        receiverUserId: this.user.id,
        transmitterUserId: this.loggedInUser.id,
        type: TYPE_ENDORSE,
        isRead: false,
        skillId: skillId
      })

    },
    async undoEndorse(skillId, i) {
      await deleteUserEndorsedSkill(this.$route.params.userId, skillId)
      this.skills[i].endorsedUsers = this.skills[i].endorsedUsers.filter(user => user.id !== this.loggedInUser.id)
    },
    async sendInvitation() {
      if (!this.connected) {
        const invitation = {
          invitorId: this.$route.params.userId,
          invitedId: this.$route.params.anonymousUserId,
        }
        await sendInvitation(invitation)
        this.invitationSend = true
      }
    },
    async checkConnection() {
      const connectionCount = await checkConnectionExists(this.$route.params.userId, this.$route.params.anonymousUserId)
      const invitationCount = await checkInvitationExists(this.$route.params.userId, this.$route.params.anonymousUserId)
      if (connectionCount.cnt === 0) {
        if (invitationCount.cnt === 0) {
          this.connected = false
        } else {
          this.invitationSend = true
        }
      } else {
        this.connected = true
      }
    },
    async fetchSkillsAndEndorsements() {
      this.skills = []

      const skills = await getSkillsByUserId(this.user.id)
      for (const skill of skills) {
        const endorsedUsers = await getEndorsedUsersBySkillId(skill.id)
        this.skills.push({
          ...skill,
          endorsedUsers
        })
      }
    },
    async fetchProfileData() {
      // fetch target user
      const userId = this.$route.params.userId
      const anonymousUserId = this.$route.params.anonymousUserId
      if (anonymousUserId) {
        this.isAnonymous = true
        this.user = await getUserById(anonymousUserId)

        this.loggedInUser = await getUserById(userId)
        if(this.user.id === this.loggedInUser.id){
          this.$router.back()
        }
      } else {
        this.isAnonymous = false
        this.user = await getUserById(userId)
      }

      this.languages = await getLanguagesByUserId(this.user.id)
      this.favorites = await getFavoritesByUserId(this.user.id)
      await this.fetchSkillsAndEndorsements()
      this.accomplishments = await getAccomplishmentsByUserId(this.user.id)
    }
  },
  async mounted() {
    await this.fetchProfileData()
    await this.checkConnection()

    if (this.isAnonymous) {
      await insertNotification({
        receiverUserId: this.user.id,
        transmitterUserId: this.loggedInUser.id,
        type: TYPE_PROFILE_SEEN,
        isRead: false
      })
    }
  }
}
</script>
