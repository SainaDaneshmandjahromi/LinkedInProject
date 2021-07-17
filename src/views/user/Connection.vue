<template>
    <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Connection" active><p>Connections</p></b-tab>
            <b-tab title="People you may know" @click= "GoToPeopleYouMayKnow"><p>People you may know</p></b-tab>
            <b-tab title="Received Invitations" @click= "GoToReceivedInvitation"><p>Received Invitations</p></b-tab>
            <b-tab title="Sent Invitations" @click="GoToSentInvitation"><p>Received Invitations</p></b-tab>
        </b-tabs>

        <div :key="connection.id" v-for="connection in connections">
            <user-connection
            @GoToProfile = "GoToProfile"
            :connection="connection"/>
        </div>
</div>
</template>

<script>

import UserConnection from '@/components/UserConnection'
import { getAllConnections } from '@/db/user/connections'

export default {
    name: 'Connection',
       data: () => ({
           connections: []
    }),
    components: {
        UserConnection
    },
    methods:{
        GoToPeopleYouMayKnow(){
            this.$router.push(`/user/${this.$route.params.userId}/peopleyoumayknow`)
        },
        GoToReceivedInvitation(){
            this.$router.push(`/user/${this.$route.params.userId}/receivedinvitation`)
        },
        GoToSentInvitation(){
            this.$router.push(`/user/${this.$route.params.userId}/sentinvitation`)
        },
        GoToProfile(userId){
            ///TODOOOOOOOOO
            ///MOHSEN WILL PUT GOING TO PUBLIC PROFILE HERE
        },
    },
    async mounted() {
        this.connections = await getAllConnections(this.$route.params.userId)
    }
}
</script>
