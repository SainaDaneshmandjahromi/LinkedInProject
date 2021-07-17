<template>
    <div>
        <b-card class="mb-2"  >
            <b-card-text >
                {{ user.username }}
            </b-card-text>


            <b-card-text>{{ user.about }}</b-card-text>
            <b-link button class="card-link" @click="$emit('GoToProfile', invitation.invitorId)">Go To Profile</b-link>

            <b-link button class="card-link"
            v-if="statusInvitation.ReceivedStat==1"
            @click="$emit('AcceptInvitation', invitation.id, invitation.invitorId)">Accept</b-link>

            <b-link button class="card-link" 
            v-if="statusInvitation.ReceivedStat==1"
            @click="$emit('RejectInvitation', invitation.id)">Reject</b-link>

        </b-card>
    </div>
</template>

<script>
import { getUserById } from '@/db/user/users'

export default {
    name: 'user-received-invitation',
    data: () => ({
        user:{
            id:'',
            username:'',
            about:''
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
        this.user = await getUserById(this.invitation.invitorId)
        console.log("Hello")
    }
}
</script>