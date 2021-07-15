<template>
    <div>
        <div :key="chat.id" v-for="chat in chats">
            <EachChat 
            @showMessages = "goToChat"
            :chat="chat" />
        </div>
    </div>
</template>

<script>
import { getAllChats } from '@/db/messaging/chats'


import EachChat from './EachChat'


export default {
    name: 'Chat',
    data: () => ({
        chats:[],
    }),
    components: {
        EachChat,
    },
    methods:{
        goToChat(Id){
               this.$router.push(`/user/${this.$route.params.userId}/chat/${Id}`)
        }
    },
    emits: ['showMessages'],
    async mounted() {
        this.chats = await getAllChats(this.$route.params.userId)
    }
}
</script>
