<template>
    <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Connection" @click= "GoToConnection"><p>Connections</p></b-tab>
            <b-tab title="People you may know" active><p>People you may know</p></b-tab>
            <b-tab title="Received Invitations" @click= "GoToReceivedInvitation"><p>Received Invitations</p></b-tab>
            <b-tab title="Sent Invitations" @click="GoToSentInvitation"><p>Received Invitations</p></b-tab>
        </b-tabs>
</div>
</template>

<script>
export default {
    name: 'people-you-may-know',
       data: () => ({
    }),
    components: {
    },
    methods:{
        GoToReceivedInvitation(){
            this.$router.push(`/user/${this.$route.params.userId}/receivedinvitation`)
        },
        GoToConnection(){
            this.$router.push(`/user/${this.$route.params.userId}/connection`)
        },
        GoToSentInvitation(){
            this.$router.push(`/user/${this.$route.params.userId}/sentinvitation`)
        }
    },
    async mounted() {
    }
}
</script>
