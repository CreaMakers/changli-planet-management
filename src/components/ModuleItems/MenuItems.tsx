//左侧导航栏表头
import {  MenuProps  } from 'antd';
import {
  UserOutlined,
  CommentOutlined,
  FileOutlined,
  FileSyncOutlined,
  SmileOutlined,
  InfoCircleOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];

type ExtendedMenuItemType = MenuItem & {
  path?: string;
};

type ExtendedMenuItem = Required<MenuProps>['items'][number] & {
  children?:ExtendedMenuItemType[],
  path?:string
};

const items: ExtendedMenuItem[]= [
    {
      key: 'sub1',
      label: '用户管理',
      icon: <UserOutlined />,
      path:'/layout/usersbasic',
      children: [
        { key: '1-1', label: '用户基础信息',path:'/layout/usersbasic' },
        { key: '1-2', label: '用户群聊信息',path:'/layout/usersgroup' },
        { key: '1-3', label: '用户帖子信息',path:'/layout/uesrstiezi' },
      ],
    },
    {
      key: 'sub2',
      label: '群聊管理',
      icon: <CommentOutlined />,
      children: [
        { key: '2-1', label: '群聊列表',path:'/layout/groupLists' }
      ],
    },
    {
      key: 'sub3',
      label: '聊天管理',
      icon: <CommentOutlined />,
    },
    {
      key: 'sub4',
      label: '公告管理',
      icon: <ScheduleOutlined />,
      path:'/layout/announcementLists'
    },
    {
      key: 'sub5',
      label: '帖子管理',
      icon: <FileSyncOutlined />,
      children: [
        { key: '5-1', label: '帖子处理',path:'/layout/postingLists' },
        { key: '5-2', label: '举报处理',path:'/layout/postingLists/reportLists' }
      ],
    },
    {
      key: 'sub6',
      label: '文件管理',
      icon: <FileOutlined />,
      path:'/layout/documentLists'
    },
    {
      key: 'sub7',
      label: '通知管理',
      icon: <InfoCircleOutlined />,
      children: [
        { key: '7-1', label: '系统通知',path:'/layout/sendNoctices/system' },
        { key: '7-2', label: '用户通知',path:'/layout/sendNoctices/user' }
      ],
    },
    {
      key: 'sub8',
      label: '举报反馈',
      icon: <SmileOutlined />,
      path:'/layout/reportLists'
    },
    {
      key: 'sub9',
      label: '违规管理',
      icon: <SmileOutlined />,
      path:'/layout/violations'
    },
    {
      key: 'sub10',
      label: '权限管理',
      icon: <SmileOutlined />,
      path:'/layout/permission'
    },
    {
      key: 'sub11',
      label: '新鲜事',
      icon: <SmileOutlined />,
      path:'/layout/freshNews'
    },
  ];

export default items