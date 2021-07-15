<template>
    <div>
        <div :key="chat.id" v-for="chat in chats">
            <EachChat :chat="chat" />
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
    async mounted() {
        this.chats = await getAllChats(this.$route.params.userId)
    }
}
</script>
