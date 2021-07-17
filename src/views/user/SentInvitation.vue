<template>
    <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Connection" @click= "GoToConnection"><p>Connections</p></b-tab>
            <b-tab title="People you may know" @click= "GoToPeopleYouMayKnow"><p>People you may know</p></b-tab>
            <b-tab title="Received Invitations" @click= "GoToReceivedInvitation"><p>Received Invitations</p></b-tab>
            <b-tab title="Sent Invitations" active><p>Received Invitations</p></b-tab>
        </b-tabs>
</div>
</template>

<script>
export default {
    name: 'sent-invitation',
    data: () => ({ 
    }),
    components: {
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
        }
    },
    async mounted() {
    }
}
</script>
