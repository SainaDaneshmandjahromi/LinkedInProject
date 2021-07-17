<template>
    <div>
        <div>
            <search-message @searchMyMessage = "searchMyMessage"/>
        </div>
        <div>
        <chat-option @deleteChat = "deleteThisChat"
                     @UnArchiveChat = "UnArchiveChat"
                     @ArchiveChat = "ArchiveChat"
                     @MakeUnread = "MakeUnread"
                     :mychatuser="mychatuser"
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
import { getAllMessages, sendMessage, getSearchedMessages } from '@/db/messaging/messages'
import { deleteChat } from '@/db/messaging/chats'
import { getUserChat, updateReadStat, updateArchiveStat, clearUnreadCount,
        addUnreadCount, deleteUserChats} from '@/db/messaging/userChats'

import MessageChat from '@/components/MessageChat.vue'
import SendMessage from '@/components/SendMessage.vue'
import ChatOption from '@/components/ChatOption.vue'
import SearchMessage from '@/components/SearchMessage.vue'

export default {
    name: 'Message',
    data: () => ({
        messages:[],
        message : {
            userId: '',
            chatId: '',
            messageStat:'',
            content: ''
        },
        mychatuser:{
            id:'',
            userId : '',
            chatId : '',
            messageUnreadCount : '',
            archiveChatStat: '',
            readChatStat: '',
        },
        searchContent:{
            text:''
        }
    }),
    components: {
        MessageChat,
        SendMessage,
        ChatOption,
        SearchMessage
    },

    async mounted() {
        if(this.$route.name ==  "ArchivedMessage" || this.$route.name ==  "UnreadMessage" 
        || this.$route.name == "Message"){

        this.messages = await getAllMessages(this.$route.params.chatId)

        }
        else{
            //console.log("BYYYYYYYYYYYYEEEEEEEEEEEEE")
            await console.log(this.searchContent.text)
            //this.messages = await getSearchedMessages(this.$route.params.chatId, this.searchContent.text)

        }
        this.mychatuser = await getUserChat(this.$route.params.chatId, this.$route.params.userId),

        await updateReadStat(this.$route.params.chatId, this.$route.params.userId, "Read")
        await clearUnreadCount(this.$route.params.chatId, this.$route.params.userId)
    },

    methods:{
        async sendMyMessage(newcontent){

            this.message.userId =  this.$route.params.userId,
            this.message.chatId = this.$route.params.chatId,
            this.message.content = newcontent,
            this.message.messageStat = "Unread",

            sendMessage(this.message),
            
            addUnreadCount(this.$route.params.chatId, this.$route.params.userId)
            this.messages = await getAllMessages(this.$route.params.chatId)
        },

        searchMyMessage(text){
            console.log(text)

            this.searchContent.text = text
            console.log(this.searchContent.text)
            console.log("HIIIIIIIIIIIII")
            this.$router.push(`/user/${this.$route.params.userId}/archivedchat/${this.$route.params.chatId}/search`)

        },


        deleteThisChat(){
            deleteChat(this.$route.params.chatId)

            deleteUserChats(this.$route.params.chatId)

            if(this.$route.name == "ArchivedMessage" || this.$route.name == "ArchivedSearch"){
                this.$router.push(`/user/${this.$route.params.userId}/archivedchat`)
            }
            else if(this.$route.name == "UnreadMessage" || this.$route.name == "UnreadSearch"){
                this.$router.push(`/user/${this.$route.params.userId}/unreadchat`)
            }
            else{
                this.$router.push(`/user/${this.$route.params.userId}/chat`)
            }
        },

        UnArchiveChat(){
            updateArchiveStat(this.$route.params.chatId, this.$route.params.userId, "NotArchived")
            this.$router.push(`/user/${this.$route.params.userId}/chat`)
            alert("Chat Removed from Archive");
        },

        ArchiveChat(){
            updateArchiveStat(this.$route.params.chatId, this.$route.params.userId, "Archived")
            this.$router.push(`/user/${this.$route.params.userId}/archivedchat`)
            alert("Chat Added To Archive");
        },

        MakeUnread(){
            updateReadStat(this.$route.params.chatId, this.$route.params.userId, "NotRead")
            this.$router.push(`/user/${this.$route.params.userId}/unreadchat`)
            alert("Chat Added To Unread");
        }

        
    }
}
</script>
