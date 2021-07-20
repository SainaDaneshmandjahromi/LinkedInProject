import User from '@/views/user/User'
import UserHome from '@/views/user/UserHome'
import UserSearch from '../views/user/UserSearch'
import UserProfile from '@/views/user/UserProfile'
import EditUserProfile from '../views/user/EditUserProfile'
import UserNotifications from '../views/user/UserNotifications'
import Connection from '@/views/user/Connection'
import PeopleYouMayKnow from '@/views/user/PeopleYouMayKnow'
import SentInvitation from '@/views/user/SentInvitation'
import ReceivedInvitation from '@/views/user/ReceivedInvitation'
import postingRoutes from './posting'
import messagingRoutes from './messaging'
import EditFavorites from '../views/user/EditFavorites'
import EditSkills from '../views/user/EditSkills'
import EditAccomplishments from '../views/user/EditAccomplishments'


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
                path: 'search/:username',
                name: 'UserSearch',
                component: UserSearch
            },
            {
                path: 'profile',
                name: 'UserProfile',
                component: UserProfile
            },
            {
                path: 'edit-profile',
                name: 'EditUserProfile',
                component: EditUserProfile
            },
            {
                path: 'edit-favorites',
                name: 'EditFavorites',
                component: EditFavorites
            },
            {
                path: 'edit-skills',
                name: 'EditSkills',
                component: EditSkills
            },
            {
                path: 'edit-accomplishments',
                name: 'EditAccomplishments',
                component: EditAccomplishments
            },
            {
                path: 'anonymous-profile/:anonymousUserId',
                name: 'AnonymousUserProfile',
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