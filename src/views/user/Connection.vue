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
import { getAllConnections, checkConnectionExists,
         getMutualConnectionsCount, searchUserConnection } from '@/db/user/connections'




export default {
    name: 'Connection',
       data: () => ({
           connections: [],
           searchedUsers:[],
           numConnection:{
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

            this.connections = []
            this.searchedUsers = []

            this.mutualcount.cnt = 0
            this.numConnection = []
            this.searchedConnections = []
            
            this.searchedUsers = await searchUserConnection(this.$route.params.userId,text)



            for(const property in this.searchedUsers){

                this.mutualcount = await getMutualConnectionsCount(this.searchedUsers[property].Id, this.$route.params.userId)
                this.numConnection = await checkConnectionExists(this.searchedUsers[property].Id, this.$route.params.userId)

                this.searchedConnections.push({ connectionId : this.numConnection.id,
                                                connectedOneId : this.searchedUsers[property].Id ,
                                                connectedTwoId :  this.$route.params.userId,
                                                cnt:this.mutualcount.cnt
                                                })
                                        
                this.searchedConnections.sort((a, b) => {
                    return b.cnt - a.cnt;
                });
                
            }
            this.connections = this.searchedConnections
        }

    },
    async mounted() {

        this.connections = []
        this.connections = await getAllConnections(this.$route.params.userId)
    }
}
</script>
