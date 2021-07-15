import Chat from '@/views/messaging/Chat'
import Message from '@/views/messaging/Message'

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
        // children: [
        //     {
        //         path: ':chatId',
        //         name: 'Message',
        //         component: Message
        //     },
        // ]


]
