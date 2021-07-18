<template>
    <div>
        <b-card class="mb-2"  >
            <b-card-text >
                {{ user.username }}
            </b-card-text>


            <b-card-text>{{ user.about }}</b-card-text>
            <b-link button class="card-link" @click="$emit('GoToProfile', user.id)">Go To Profile</b-link>

            <b-link button class="card-link" >    
            {{  mutualConnection.cnt }} Mutual Connection</b-link>

        </b-card>
    </div>
</template>

<script>

import { getUserById } from '@/db/user/users'
import { getMutualConnectionsCount } from '@/db/user/connections'

export default {
    
    name: 'user-people-you-may-know',
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
        mayKnow:Object,
    },
    methods:{
    },
    async mounted() {
        this.user = await getUserById(this.mayKnow.connectedId)

        this.mutualConnection = await getMutualConnectionsCount(this.$route.params.userId ,
            this.mayKnow.connectedId)

    }
}
</script>