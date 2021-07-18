import User from '@/views/user/User'
import UserHome from '@/views/user/UserHome'
import UserProfile from '@/views/user/UserProfile'
import Connection from '@/views/user/Connection'
import PeoplaYouMayKnow from '@/views/user/PeopleYouMayKnow'
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
                path: 'connection',
                name: 'Connection',
                component: Connection
            },
            {
                path: 'peopleyoumayknow',
                name: 'PeoplaYouMayKnow',
                component: PeoplaYouMayKnow
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