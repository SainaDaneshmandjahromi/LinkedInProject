<template>
    <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Connection" @click= "GoToConnection"><p>Connections</p></b-tab>
            <b-tab title="People you may know" active><p>People you may know</p></b-tab>
            <b-tab title="Received Invitations" @click= "GoToReceivedInvitation"><p>Received Invitations</p></b-tab>
            <b-tab title="Sent Invitations" @click="GoToSentInvitation"><p>Received Invitations</p></b-tab>
        </b-tabs>

        <div v-for="(mayKnow, key) in mayKnows" :key="key">
            <user-people-you-may-know
            @GoToProfile = "GoToProfile"
            :mayKnow="mayKnow"/>
        </div>
</div>
</template>

<script>
import UserPeopleYouMayKnow from '@/components/UserPeopleYouMayKnow'
import { getAllPeopleYouMayKnow } from '@/db/user/connections'

export default {
    name: 'people-you-may-know',
       data: () => ({
           mayKnows:[]
    }),
    components: {
        UserPeopleYouMayKnow
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
        },
        GoToProfile(userId){
            ///TODOOOOOOOOO
            ///MOHSEN WILL PUT GOING TO PUBLIC PROFILE HERE
        },

    },
    async mounted() {
        this.mayKnows = await getAllPeopleYouMayKnow(this.$route.params.userId)
    }
}
</script>
