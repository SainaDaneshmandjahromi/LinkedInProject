<template>
    <div>
        <div>
            <div :key="message.id" v-for="message in messages">
                <message-chat
                :message="message"
                />
            </div>
        </div>
        <div>
            <send-message @sendMyMessage = "sendMyMessage" />
        </div>
    
    </div>
</template>

<script>
import { getAllMessages } from '@/db/messaging/messages'
import { sendMessage } from '@/db/messaging/messages'

import MessageChat from '@/components/MessageChat.vue'
import SendMessage from '@/components/SendMessage.vue'

export default {
    name: 'Message',
    data: () => ({
        messages:[],
        message : {
            userId: '',
            chatId: '',
            content: ''
    }
    }),
    components: {
        MessageChat,
        SendMessage
    },
    async mounted() {
        this.messages = await getAllMessages(this.$route.params.chatId)
    },
    methods:{
        async sendMyMessage(newcontent){
            this.message.userId =  this.$route.params.userId,
            this.message.chatId = this.$route.params.chatId,
            this.message.content = newcontent,
            sendMessage(this.message),
            this.messages = await getAllMessages(this.$route.params.chatId)
        }
    }
}
</script>
