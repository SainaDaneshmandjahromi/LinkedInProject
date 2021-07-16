<template>
    <div>
        <div>
        <chat-option @deleteChat = "deleteThisChat"
                     @UnArchiveChat = "UnArchiveChat"
                     @ArchiveChat = "ArchiveChat"
                     :chat="chat"
                />
        </div>
        <div>
            <div :key="message.id" v-for="message in messages">
                <message-chat
                class="mb-2"
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
import { getAllMessages, sendMessage  } from '@/db/messaging/messages'
import { deleteChat,  getChatByChatId, updateArchiveChatStat } from '@/db/messaging/chats'

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
        },
        chat:{
            firstParticipantId:'',
            secondParticipantId:'',
            archiveStat:''
        }
    }),
    components: {
        MessageChat,
        SendMessage,
        ChatOption
    },
    async mounted() {
        this.messages = await getAllMessages(this.$route.params.chatId),
        this.chat = await getChatByChatId(this.$route.params.chatId)
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
            deleteChat(this.$route.params.chatId)

            if(this.$route.name == "ArchivedMessage"){
                this.$router.push(`/user/${this.$route.params.userId}/archivedchat`)
            }
            else{
                this.$router.push(`/user/${this.$route.params.userId}/chat`)
            }
        },
        UnArchiveChat(){
            updateArchiveChatStat(this.$route.params.chatId,"NotArchived")
            this.$router.push(`/user/${this.$route.params.userId}/chat`)
            alert("Chat Removed from Archive");
        },
        ArchiveChat(){
            updateArchiveChatStat(this.$route.params.chatId,"Archived"),
            this.$router.push(`/user/${this.$route.params.userId}/archivedchat`)
            alert("Chat Added To Archive");
        }
    }
}
</script>
