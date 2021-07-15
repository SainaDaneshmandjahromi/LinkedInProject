<template>
    <div>
        <div :key="chat.id" v-for="chat in chats">
            <user-chat 
            @showMessages = "goToChat"
            :chat="chat" />
        </div>
    </div>
</template>

<script>
import { getAllChats } from '@/db/messaging/chats'

import UserChat from '@/components/UserChat'

export default {
    name: 'Chat',
    data: () => ({
        chats:[],
    }),
    components: {
        UserChat
    },
    methods:{
        goToChat(Id){
               this.$router.push(`/user/${this.$route.params.userId}/chat/${Id}`)
        },
    },
    emits: ['showMessages'],
    async mounted() {
        this.chats = await getAllChats(this.$route.params.userId)
    }
}
</script>
