import Chat from '@/views/messaging/Chat'
import Message from '@/views/messaging/Message'
import ArchivedChat from '@/views/messaging/ArchivedChat'

export default [
    {
        path: 'chat',
        name: 'Chat',
        component: Chat,
    },
    {
        path: 'chat/:chatId',
        name: 'Message',
        component: Message,
    },
    {
        path: 'archivedchat',
        name: 'ArchivedChat',
        component: ArchivedChat,
    },
    {
        path: 'archivedchat/:chatId',
        name: 'ArchivedMessage',
        component: Message,
    }

]
