import User from '@/views/user/User'
import UserHome from '@/views/user/UserHome'
import UserProfile from '@/views/user/UserProfile'
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
            ...postingRoutes,
            ...messagingRoutes
        ]
    },
]