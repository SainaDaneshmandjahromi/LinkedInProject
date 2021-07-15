<template>
    <div>
        <div :key="message.id" v-for="message in messages">
            <message-chat
            :message="message"
            />
        </div>
    </div>
</template>

<script>
import { getAllMessages } from '@/db/messaging/messages'

import MessageChat from '@/components/MessageChat'

export default {
    name: 'Message',
    data: () => ({
        messages:[],
    }),
    components: {
        MessageChat
    },
    async mounted() {
        this.messages = await getAllMessages(this.$route.params.chatId)
    }
}
</script>
