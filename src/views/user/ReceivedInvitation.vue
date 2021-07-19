<template>
  <div>

    <b-tabs content-class="mt-3" justified>
      <b-tab title="Connection" @click="GoToConnection"><p>Connections</p></b-tab>
      <b-tab title="People you may know" @click="GoToPeopleYouMayKnow"><p>People you may know</p></b-tab>
      <b-tab title="Received Invitations" active><p>Received Invitations</p></b-tab>
      <b-tab title="Sent Invitations" @click="GoToSentInvitation"><p>Received Invitations</p></b-tab>
    </b-tabs>

    <div>
      <div :key="invitation.id" v-for="invitation in invitations">
        <user-received-invitation
          @GoToProfile="GoToProfile"
          @AcceptInvitation="AcceptInvitation"
          @RejectInvitation="RejectInvitation"
          :invitation="invitation"
          :statusInvitation="statusInvitation"/>
      </div>
    </div>

  </div>
</template>


<script>

import UserReceivedInvitation from '@/components/UserReceivedInvitation'
import { getAllReceivedInvitations, withdrawInvitation } from '@/db/user/invitations'
import { newConnection } from '@/db/user/connections'

export default {
  name: 'received-invitation',
  data: () => ({
    invitations: [],
    connection: {
      connectedOneId: '',
      connectedTwoId: ''
    },
    statusInvitation: {
      ReceivedStat: ''
    }
  }),
  components: {
    UserReceivedInvitation
  },
  methods: {
    GoToPeopleYouMayKnow() {
      this.$router.push(`/user/${this.$route.params.userId}/peopleyoumayknow`)
    },
    GoToConnection() {
      this.$router.push(`/user/${this.$route.params.userId}/connection`)
    },
    GoToSentInvitation() {
      this.$router.push(`/user/${this.$route.params.userId}/sentinvitation`)
    },

    GoToProfile(userId) {
      this.$router.push(`/user/${this.$route.params.userId}/anonymous-profile/${userId}`)
      ///TODOOOOOOOOO
      ///MOHSEN WILL PUT GOING TO PUBLIC PROFILE HERE
    },
    AcceptInvitation(invitationId, userId) {
      withdrawInvitation(invitationId)

      this.connection.connectedOneId = this.$route.params.userId,
        this.connection.connectedTwoId = userId,

        newConnection(this.connection)

      this.invitations = getAllReceivedInvitations(this.$route.params.userId)
      this.$router.push(`/user/${this.$route.params.userId}/connection`)
    },
    RejectInvitation(invitationId) {
      withdrawInvitation(invitationId)

      this.invitations = getAllReceivedInvitations(this.$route.params.userId)
      this.$router.push(`/user/${this.$route.params.userId}/connection`)
    }

  },
  async mounted() {
    this.invitations = await getAllReceivedInvitations(this.$route.params.userId)
    this.statusInvitation.ReceivedStat = 1
  }
}
</script>
