<template>
    <div>
        <b-card class="mb-2"  >
            <b-card-text >
                {{ user.username }}
            </b-card-text>


            <b-card-text>{{ user.about }}</b-card-text>
            <b-link button class="card-link" @click="$emit('GoToProfile', invitation.invitorId)">Go To Profile</b-link>

            <b-link button class="card-link" >    
            {{  mutualConnection.cnt }} Mutual Connection</b-link>

        </b-card>
    </div>
</template>

<script>
import { getUserById } from '@/db/user/users'
import { getMutualConnectionsCount } from '@/db/user/connections'

export default {
    name: 'user-connection',
    data: () => ({
        user:{
            id:'',
            username:'',
            about:''
        },
        mutualConnection:{
            cnt:''
        }
    }),
    props:{
        connection:Object,
    },
    components: {
    },
    methods:{
    },
    async mounted() {
        if(this.connection.connectedOneId==this.$route.params.userId){
            this.user = await getUserById(this.connection.connectedTwoId)
        }
        else{
            this.user = await getUserById(this.connection.connectedOneId)
        }

        this.mutualConnection = await getMutualConnectionsCount(this.connection.connectedTwoId ,
            this.connection.connectedOneId)

    }
}
</script>