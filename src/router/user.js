import UserHome from '@/views/user/UserHome'

import postingRoutes from './posting'
import messagingRoutes from './messaging'

export default [
    {
        path: '/user/:userId',
        name: 'UserHome',
        component: UserHome,
        children: [
            {
                path: '/profile',
                // component: TODO
            },
            ...postingRoutes,
            ...messagingRoutes
        ]
    },
]