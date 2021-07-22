<template>
  <div>
    <b-card class="mb-2 mt-2">
      <b-card-text>
        {{ user.username }}
      </b-card-text>

      <b-card-text>{{ user.about }}</b-card-text>
      <b-link button class="card-link" @click="$emit('GoToProfile', user.id)">Go To Profile</b-link>

      <b-link class="card-link">
        {{ mutualConnection.cnt }} Mutual Connection
      </b-link>

      <b-link button class="card-link" @click="CreateChat"> Create Chat</b-link>

    </b-card>
  </div>
</template>

<script>
import { getUserById } from '@/db/user/users'
import { getMutualConnectionsCount } from '@/db/user/connections'
import { checkChatExists, getChatId, insertChat } from '@/db/messaging/chats'
import { insertUserChat } from '@/db/messaging/userChats'

export default {
  name: 'user-connection',
  data: () => ({
    user: {
      id: '',
      username: '',
      about: ''
    },
    mutualConnection: {
      cnt: ''
    },
    chat: {
      id: '',
      firstParticipantId: '',
      secondParticipantId: ''
    },
    userOneChat: {
      userId: '',
      chatId: '',
      messageUnreadCount: '',
      archiveChatStat: '',
      readChatStat: '',
    },
    userTwoChat: {
      userId: '',
      chatId: '',
      messageUnreadCount: '',
      archiveChatStat: '',
      readChatStat: '',
    },
    chatNum: {
      id: '',
      cnt: ''
    },
    newChat: {
      id: ''
    }
  }),
  props: {
    connection: Object,
  },
  components: {},
  methods: {
    async CreateChat() {


      ////Mohsen Copy THIS
      if (this.chatNum.cnt == 0) {

        console.log('Hi1')
        console.log(this.chatNum)
        this.chat.firstParticipantId = this.user.id
        this.chat.secondParticipantId = this.$route.params.userId

        insertChat(this.chat)
        this.newChat = await getChatId(this.user.id, this.$route.params.userId)
        this.userOneChat.userId = this.user.id
        this.userOneChat.chatId = this.newChat.id
        this.userOneChat.messageUnreadCount = 0
        this.userOneChat.archiveChatStat = 'NotArchived'
        this.userOneChat.readChatStat = 'Read'

        console.log(this.userOneChat)
        insertUserChat(this.userOneChat)
        console.log(this.userOneChat)

        this.userTwoChat.userId = this.$route.params.userId
        this.userTwoChat.chatId = this.newChat.id
        this.userTwoChat.messageUnreadCount = 0
        this.userTwoChat.archiveChatStat = 'NotArchived'
        this.userTwoChat.readChatStat = 'Read'

        insertUserChat(this.userTwoChat)

        this.$router.push(`/user/${this.$route.params.userId}/chat/${this.chat.id}`)

      } else {
        console.log('Hi2')
        console.log(this.chatNum)
        this.$router.push(`/user/${this.$route.params.userId}/chat/${this.chatNum.id}`)
      }

    }
  },
  async mounted() {
    if (this.connection.connectedOneId == this.$route.params.userId) {
      this.user = await getUserById(this.connection.connectedTwoId)
    } else {
      this.user = await getUserById(this.connection.connectedOneId)
    }

    this.chatNum = await checkChatExists(this.user.id, this.$route.params.userId)

    this.mutualConnection = await getMutualConnectionsCount(this.connection.connectedTwoId,
      this.connection.connectedOneId)

  }
}
</script>