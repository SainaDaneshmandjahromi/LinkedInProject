<template>
    <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Connection" active><p>Connections</p></b-tab>
            <b-tab title="People you may know" @click= "GoToPeopleYouMayKnow"><p>People you may know</p></b-tab>
            <b-tab title="Received Invitations" @click= "GoToReceivedInvitation"><p>Received Invitations</p></b-tab>
            <b-tab title="Sent Invitations" @click="GoToSentInvitation"><p>Received Invitations</p></b-tab>
        </b-tabs>
        <div>
            <search-message @searchMyMessage = "searchMyMessage"/>
        </div>
        <div :key="connection.id" v-for="connection in connections">
            <user-connection
            @GoToProfile = "GoToProfile"
            :connection="connection"/>
        </div>
</div>
</template>

<script>

import UserConnection from '@/components/UserConnection'
import SearchMessage from '@/components/SearchMessage.vue'
import { getAllConnections, checkConnectionExists, getMutualConnectionsCount } from '@/db/user/connections'
import { searchUserByName } from '@/db/user/users'



export default {
    name: 'Connection',
       data: () => ({
           connections: [],
           searchedUsers:[],
           countconnection:{
               id:'',
               cnt:''
           },
           mutualcount:{
            cnt:''
           },
           searchedConnections:[]
    }),
    components: {
        UserConnection,
        SearchMessage
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


        ////CHECK THIS ONE
        async searchMyMessage(text){
            this.searchedUsers = await searchUserByName(text,this.$route.params.userId)
            console.log(this.searchedUsers)

            for(this.searchedUser in this.searchedUsers){
                this.countconnection = await checkConnectionExists(this.searchedUser.id, this.$route.params.userId)

                if(this.countconnection.cnt != 0){
                    this.mutualcount = await getMutualConnectionsCount(this.searchedUser.id, this.$route.params.userId)
                    this.searchedConnections.push({connectedOneId : this.searchedUser.id ,
                                                connectedTwoId :  this.$route.params.userId,
                                                cnt:this.mutualcount.cnt
                                                })
                }

            }
            console.log(this.searchedConnections)
        }

    },
    async mounted() {
        this.connections = await getAllConnections(this.$route.params.userId)
    }
}
</script>
