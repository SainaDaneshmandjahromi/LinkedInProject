<template>
    <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Connection" active><p>Connections</p></b-tab>
            <b-tab title="People you may know" @click= "GoToPeopleYouMayKnow"><p>People you may know</p></b-tab>
            <b-tab title="Received Invitations" @click= "GoToReceivedInvitation"><p>Received Invitations</p></b-tab>
            <b-tab title="Sent Invitations" @click="GoToSentInvitation"><p>Received Invitations</p></b-tab>
        </b-tabs>
</div>
</template>

<script>
export default {
    name: 'Connection',
       data: () => ({
    }),
    components: {
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
        }
    },
    async mounted() {
    }
}
</script>
