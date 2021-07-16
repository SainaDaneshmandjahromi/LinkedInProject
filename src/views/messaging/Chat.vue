<template>
    <div>
        <div>
            <b-tabs content-class="mt-3" fill>
                <b-tab title="AllChats" active><p>All Chats</p></b-tab>
                <b-tab title="ArchivedChats" @click="goToArchivedChat"><p>Archived Chats</p></b-tab>
                <b-tab title="UnreadChats" @click="goToUnreadChat"><p>Unread Chats</p></b-tab>
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
import UserChat from '@/components/UserChat'
export default {
    name: 'Chat',
    ////Changed HERE
    data: () => ({
        chats:[],
    }),
    components: {
        UserChat
    },
    methods:{
        goToMessages(Id){
            this.$router.push(`/user/${this.$route.params.userId}/chat/${Id}`)
        },
        goToArchivedChat(){
            this.$router.push(`/user/${this.$route.params.userId}/archivedchat`)
        },
        goToUnreadChat(){
            this.$router.push(`/user/${this.$route.params.userId}/unreadchat`)
        },
    },
    emits: ['showMessages'],
    async mounted() {
        this.chats = await getAllChats(this.$route.params.userId)
    }
}
</script>