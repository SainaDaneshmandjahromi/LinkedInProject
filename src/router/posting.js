import NewPost from '@/views/posting/NewPost'
import ExpandPost from '@/views/posting/ExpandPost'
import SharePost from '@/views/posting/SharePost'
import ThisUserPosts from  '@/views/posting/ThisUserPosts'
export default [
    {
        path: 'newpost',
        name: 'NewPost',
        component: NewPost
    },
    {
        path: ':postId/expandpost',
        name: 'ExpandPost',
        component: ExpandPost
    },
    {
        path: ':postId/sharepost',
        name: 'SharePost',
        component: SharePost
    },
    {
        path: 'ThisUserPosts',
        name: 'ThisUserPosts',
        component: ThisUserPosts
    },
]