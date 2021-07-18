<template>
    <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Connection" @click= "GoToConnection"><p>Connections</p></b-tab>
            <b-tab title="People you may know" @click= "GoToPeopleYouMayKnow"><p>People you may know</p></b-tab>
            <b-tab title="Received Invitations" @click= "GoToReceivedInvitation"><p>Received Invitations</p></b-tab>
            <b-tab title="Sent Invitations" active><p>Received Invitations</p></b-tab>
        </b-tabs>

        <div>
        <div :key="invitation.id" v-for="invitation in invitations">
            <user-received-invitation
            @GoToProfile = "GoToProfile"
            :invitation="invitation" 
            :statusInvitation="statusInvitation"/>
        </div>
        </div>
    </div>
</template>

<script>

import UserReceivedInvitation from '@/components/UserReceivedInvitation'
import { getAllSentInvitations } from '@/db/user/invitations'

export default {
    name: 'sent-invitation',
    data: () => ({
        invitations:[],
        connection:{
            connectedOneId:'',
            connectedTwoId:''
        },
        statusInvitation:{
            ReceivedStat:''
        }
    }),
    components: {
        UserReceivedInvitation
    },
    methods:{
        GoToPeopleYouMayKnow(){
            this.$router.push(`/user/${this.$route.params.userId}/peopleyoumayknow`)
        },
        GoToConnection(){
            this.$router.push(`/user/${this.$route.params.userId}/connection`)
        },
        GoToReceivedInvitation(){
            this.$router.push(`/user/${this.$route.params.userId}/receivedinvitation`)
        },

        GoToProfile(userId){
            ///TODOOOOOOOOO
            ///MOHSEN WILL PUT GOING TO PUBLIC PROFILE HERE
        }

    },
    async mounted() {
        this.invitations = await getAllSentInvitations(this.$route.params.userId)
        console.log(this.invitations)
        this.statusInvitation.ReceivedStat = 0
    }
}
</script>
