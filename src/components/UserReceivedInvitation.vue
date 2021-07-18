<template>
    <div>
        <b-card class="mb-2"  >
            <b-card-text >
                {{ user.username }}
            </b-card-text>


            <b-card-text>{{ user.about }}</b-card-text>
            <b-link button class="card-link" @click="$emit('GoToProfile', user.id)">Go To Profile</b-link>

            <b-link button class="card-link"
            v-if="statusInvitation.ReceivedStat==1"
            @click="$emit('AcceptInvitation', invitation.id, invitation.invitorId)">Accept</b-link>

            <b-link button class="card-link" 
            v-if="statusInvitation.ReceivedStat==1"
            @click="$emit('RejectInvitation', invitation.id)">Reject</b-link>

            <b-link button class="card-link" >    
            {{  mutualConnection.cnt }} Mutual Connection</b-link>

        </b-card>
    </div>
</template>

<script>
import { getUserById } from '@/db/user/users'
import { getMutualConnectionsCount } from '@/db/user/connections'

export default {
    name: 'user-received-invitation',
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
        invitation:Object,
        statusInvitation : Object
    },
    components: {
    },
    methods:{
    },
    async mounted() {
        if(this.statusInvitation.ReceivedStat==1){
            this.user = await getUserById(this.invitation.invitorId)
        }
        else if(this.statusInvitation.ReceivedStat==0){
            this.user = await getUserById(this.invitation.invitedId)
        }

        this.mutualConnection = await getMutualConnectionsCount(this.invitation.invitorId ,
            this.invitation.invitedId)

    }
}
</script>