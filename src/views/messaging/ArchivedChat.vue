<template>
    <div>
        <div>
        <b-tabs content-class="mt-3" fill>
            <b-tab title="AllChats" @click="goToChat"><p>All Chats</p></b-tab>
            <b-tab title="ArchivedChats" active><p>Archived Chats</p></b-tab>
        </b-tabs>
        </div>
        <div :key="chat.id" v-for="chat in chats">
            <user-chat 
            @showMessages = "goToMessages"
            :chat="chat" />
        </div>
    </div>
</template>

<script>
import { getAllChats } from '@/db/messaging/chats'
import { deleteChat } from '@/db/messaging/chats'

import UserChat from '@/components/UserChat'

export default {
    name: 'ArchivedChat',
    data: () => ({
        chats:[],
    }),
    components: {
        UserChat
    },
    methods:{
        goToMessages(Id){
            this.$router.push(`/user/${this.$route.params.userId}/archivedchat/${Id}`)
        },
        goToChat(){
            this.$router.push(`/user/${this.$route.params.userId}/chat`)
        },

    },
    emits: ['showMessages'],
    async mounted() {
        this.chats = await getAllChats(this.$route.params.userId)
    }
}
</script>
