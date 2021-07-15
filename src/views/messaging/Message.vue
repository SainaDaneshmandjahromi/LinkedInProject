<template>
    <div>
        <div>
        <chat-option @deleteChat = "deleteThisChat" />
        </div>
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
import { deleteChat } from '@/db/messaging/chats'

import MessageChat from '@/components/MessageChat.vue'
import SendMessage from '@/components/SendMessage.vue'
import ChatOption from '@/components/ChatOption.vue'

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
        SendMessage,
        ChatOption
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
        },
        deleteThisChat(){
            console.log(this.$route)
            deleteChat(this.$route.params.chatId)
            if(this.$route.name == "ArchivedMessage"){
                this.$router.push(`/user/${this.$route.params.userId}/archivedchat`)
            }
            else{
                this.$router.push(`/user/${this.$route.params.userId}/chat`)
            }
        }
    }
}
</script>
