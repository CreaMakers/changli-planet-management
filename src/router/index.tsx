import { createBrowserRouter,Navigate} from 'react-router-dom'
import { lazy } from 'react'
const router = createBrowserRouter([
{
  path: '/layout',
  Component: lazy(()=>import('@/pages/Layout')) ,
  children: [
    {
      path: 'usersbasic',
      Component: lazy(()=>import('@/pages/context/UsersManage/UsersBasic')),
    }, {
      path: 'usersgroup',
      Component: lazy(()=>import('@/pages/context/UsersManage/UsersGroup')),
    }, {
      path: 'uesrstiezi',
      Component: lazy(()=>import('@/pages/context/UsersManage/UsersTiezi')),
    },{
      path: 'groupLists',
      Component: lazy(()=>import('@/pages/context/GroupsManage/GroupLists.tsx')),
    },{
      path: 'groupsedit',
      Component: lazy(()=>import('@/pages/context/GroupsManage/GroupEdit.tsx')),
    },{
      path: 'postingLists',
      Component: lazy(()=>import('@/pages/context/PostingsManage/PostingList/index.tsx')),
      children: [
        {
          path: ':postId',
          Component: lazy(() => import('@/pages/context/PostingsManage/PostingList/PostingDetail')),
          children: [
            {
              path: ':postId',
              Component: lazy(() => import('@/pages/context/PostingsManage/PostingList/PostingComments')),
              
            }
          ],
        },
        {
          path:'reportLists',
          Component: lazy(() => import('@/pages/context/PostingsManage/ReportList/index.tsx')),
        }
      ],
    },{
      path: 'announcementLists',
      Component: lazy(() => import('@/pages/context/AnnouncementManage/index.tsx')),
      children:[
        {
          path:':announcementId',
          Component: lazy(() => import('@/pages/context/AnnouncementManage/AnnouncementDetail.tsx')),

        }
      ]
    },{
      path: 'documentLists',
      Component: lazy(() => import('@/pages/context/DocumentManage/index.tsx')),
    },{
      path: 'reportLists',
      Component: lazy(() => import('@/pages/context/ReportManage/index.tsx')),
      children:[
        {
          path:':reportId',
          Component: lazy(() => import('@/pages/context/ReportManage/ReportDetail.tsx')),

        }
      ]
    },{
      path: 'sendNoctices/:noticeType',
      Component: lazy(() => import('@/pages/context/NoticeManage/index.tsx')),
    },{
      path: 'violations',
      Component: lazy(() => import('@/pages/context/ViolationsManage/index.tsx')),
    },{
      path: 'permission',
      Component: lazy(() => import('@/pages/context/PermissionManage/index.tsx')),
    },{
      path: 'freshNews',
      Component: lazy(() => import('@/pages/context/FreshNewsManage.tsx/index.tsx')),
    }
    
  ],
},
{
  path: '/',
  Component: lazy(()=>import('@/pages/Login')) ,
},
{
  path: '*',
  Component: lazy(()=>import('@/components/NotFound')) ,
},
])

export default router