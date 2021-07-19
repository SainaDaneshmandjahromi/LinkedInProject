<template>
  <div>

    <b-row class="justify-content-between">
      <b-col cols="auto">
        <search-message @searchMyMessage="searchMyMessage"/>
      </b-col>
      <b-col cols="auto">
        <chat-option @deleteChat="deleteThisChat"
                     @UnArchiveChat="UnArchiveChat"
                     @ArchiveChat="ArchiveChat"
                     @MakeUnread="MakeUnread"
                     :mychatuser="mychatuser"
        />
      </b-col>
    </b-row>

    <div class="mt-2" :key="message.id" v-for="message in messages">
      <message-chat
        class="mb-2"
        :message="message"
      />
    </div>

    <send-message @sendMyMessage="sendMyMessage"/>

  </div>
</template>

<script>
import { getAllMessages, getSearchedMessages, sendMessage } from '@/db/messaging/messages'
import { deleteChat } from '@/db/messaging/chats'
import {
  addUnreadCount,
  clearUnreadCount,
  deleteUserChats,
  getUserChat,
  updateArchiveStat,
  updateReadStat
} from '@/db/messaging/userChats'

import MessageChat from '@/components/MessageChat.vue'
import SendMessage from '@/components/SendMessage.vue'
import ChatOption from '@/components/ChatOption.vue'
import SearchMessage from '@/components/SearchMessage.vue'

export default {
  name: 'Message',
  data: () => ({
    messages: [],
    message: {
      userId: '',
      chatId: '',
      messageStat: '',
      content: ''
    },
    mychatuser: {
      id: '',
      userId: '',
      chatId: '',
      messageUnreadCount: '',
      archiveChatStat: '',
      readChatStat: '',
    },
    searchContent: {
      text: ''
    }
  }),
  components: {
    MessageChat,
    SendMessage,
    ChatOption,
    SearchMessage
  },

  async mounted() {

    this.messages = await getAllMessages(this.$route.params.chatId)

    this.mychatuser = await getUserChat(this.$route.params.chatId, this.$route.params.userId),

      await updateReadStat(this.$route.params.chatId, this.$route.params.userId, 'Read')
    await clearUnreadCount(this.$route.params.chatId, this.$route.params.userId)
  },

  methods: {
    async sendMyMessage(newcontent) {

      this.message.userId = this.$route.params.userId,
        this.message.chatId = this.$route.params.chatId,
        this.message.content = newcontent,
        this.message.messageStat = 'Unread',

        sendMessage(this.message),

        addUnreadCount(this.$route.params.chatId, this.$route.params.userId)
      this.messages = await getAllMessages(this.$route.params.chatId)
    },

    async searchMyMessage(text) {

      this.searchContent.text = text
      this.messages = await getSearchedMessages(this.$route.params.chatId, text)
      console.log(this.messages)

    },
    deleteThisChat() {
      deleteChat(this.$route.params.chatId)

      deleteUserChats(this.$route.params.chatId)

      if (this.$route.name == 'ArchivedMessage' || this.$route.name == 'ArchivedSearch') {
        this.$router.push(`/user/${this.$route.params.userId}/archivedchat`)
      } else if (this.$route.name == 'UnreadMessage' || this.$route.name == 'UnreadSearch') {
        this.$router.push(`/user/${this.$route.params.userId}/unreadchat`)
      } else {
        this.$router.push(`/user/${this.$route.params.userId}/chat`)
      }
    },

    UnArchiveChat() {
      updateArchiveStat(this.$route.params.chatId, this.$route.params.userId, 'NotArchived')
      this.$router.push(`/user/${this.$route.params.userId}/chat`)
      alert('Chat Removed from Archive')
    },

    ArchiveChat() {
      updateArchiveStat(this.$route.params.chatId, this.$route.params.userId, 'Archived')
      this.$router.push(`/user/${this.$route.params.userId}/archivedchat`)
      alert('Chat Added To Archive')
    },

    MakeUnread() {
      updateReadStat(this.$route.params.chatId, this.$route.params.userId, 'NotRead')
      this.$router.push(`/user/${this.$route.params.userId}/unreadchat`)
      alert('Chat Added To Unread')
    }


  }
}
</script>
