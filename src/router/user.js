import User from '@/views/user/User'
import UserHome from '@/views/user/UserHome'
import UserProfile from '@/views/user/UserProfile'
import UserNotifications from '../views/user/UserNotifications'
import Connection from '@/views/user/Connection'
import PeopleYouMayKnow from '@/views/user/PeopleYouMayKnow'
import SentInvitation from '@/views/user/SentInvitation'
import ReceivedInvitation from '@/views/user/ReceivedInvitation'
import postingRoutes from './posting'
import messagingRoutes from './messaging'


export default [
    {
        path: '/user/:userId',
        component: User,
        children: [
            {
                path: '',
                name: 'UserHome',
                component: UserHome
            },
            {
                path: 'profile',
                name: 'UserProfile',
                component: UserProfile
            },
            {
                path: 'notifications',
                name: 'UserNotifications',
                component: UserNotifications
            },
            {
                path: 'connection',
                name: 'Connection',
                component: Connection
            },
            {
                path: 'peopleyoumayknow',
                name: 'PeopleYouMayKnow',
                component: PeopleYouMayKnow
            },
            {
                path: 'sentinvitation',
                name: 'SentInvitation',
                component: SentInvitation
            },
            {
                path: 'receivedinvitation',
                name: 'ReceivedInvitation',
                component: ReceivedInvitation
            },
            ...postingRoutes,
            ...messagingRoutes,

        ]
    },
]