import {getPostingLists,getPostingProfiles} from '@/apis/Handle/index'
import {PostingListsProps} from '@/utils/ModuleProps/PostingItemsProps.ts'
import {useEffect,useState } from 'react'
import { Input,InputNumber,Pagination } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import {EditableProTable} from '@ant-design/pro-components';
import { Outlet, useNavigate,useParams,useMatch } from 'react-router-dom';
import { startTransition } from 'react'
import {useGeneralAPI} from '@/apis/CustomizationHooks/GeneralAPI/index.ts'
const { Search } = Input;


//测试用例(数据库更新数据后删)
let exampleRes = {
    "code": 200,
    "msg": "success",
    "data": [
      {
        "postId": 1001,
        "groupId": 5,
        "userId": 10086,
        "title": "如何提高编程效率",
        "content": "在本文中,我将分享一些提高编程效率的技巧和工具...",
        "category": 2,
        "isPinned": true,
        "viewCount": 1500,
        "coinCount": 50,
        "createTime": "2023-04-15 10:30:00",
        "updateTime": "2023-04-15 11:15:00",
        "isDeleted": false,
        "description": "分享一些实用的编程技巧和工具"
      },
      {
        "postId": 1002,
        "groupId": 5,
        "userId": 10087,
        "title": "Python入门教程",
        "content": "本教程将带您从零开始学习Python编程...",
        "category": 1,
        "isPinned": false,
        "viewCount": 3000,
        "coinCount": 120,
        "createTime": "2023-04-14 15:45:00",
        "updateTime": "2023-04-14 15:45:00",
        "isDeleted": false,
        "description": "零基础学习Python的完整指南"
      },
      {
        "postId": 1003,
        "groupId": 5,
        "userId": 10087,
        "title": "Python入门教程",
        "content": "本教程将带您从零开始学习Python编程...",
        "category": 1,
        "isPinned": false,
        "viewCount": 3000,
        "coinCount": 120,
        "createTime": "2023-04-14 15:45:00",
        "updateTime": "2023-04-14 15:45:00",
        "isDeleted": false,
        "description": "零基础学习Python的完整指南"
      },
      {
        "postId": 1004,
        "groupId": 5,
        "userId": 10087,
        "title": "Python入门教程",
        "content": "本教程将带您从零开始学习Python编程...",
        "category": 1,
        "isPinned": false,
        "viewCount": 3000,
        "coinCount": 120,
        "createTime": "2023-04-14 15:45:00",
        "updateTime": "2023-04-14 15:45:00",
        "isDeleted": false,
        "description": "零基础学习Python的完整指南"
      },
      {
        "postId": 1005,
        "groupId": 5,
        "userId": 10087,
        "title": "Python入门教程",
        "content": "本教程将带您从零开始学习Python编程...",
        "category": 1,
        "isPinned": false,
        "viewCount": 3000,
        "coinCount": 120,
        "createTime": "2023-04-14 15:45:00",
        "updateTime": "2023-04-14 15:45:00",
        "isDeleted": false,
        "description": "零基础学习Python的完整指南"
      },
      {
        "postId": 1006,
        "groupId": 5,
        "userId": 10087,
        "title": "Python入门教程",
        "content": "本教程将带您从零开始学习Python编程...",
        "category": 1,
        "isPinned": false,
        "viewCount": 3000,
        "coinCount": 120,
        "createTime": "2023-04-14 15:45:00",
        "updateTime": "2023-04-14 15:45:00",
        "isDeleted": false,
        "description": "零基础学习Python的完整指南"
      },
      {
        "postId": 1007,
        "groupId": 5,
        "userId": 10087,
        "title": "Python入门教程",
        "content": "本教程将带您从零开始学习Python编程...",
        "category": 1,
        "isPinned": false,
        "viewCount": 3000,
        "coinCount": 120,
        "createTime": "2023-04-14 15:45:00",
        "updateTime": "2023-04-14 15:45:00",
        "isDeleted": false,
        "description": "零基础学习Python的完整指南"
      },
    ]
}
  
export default function PostingManage(){

    const { debounce } = useGeneralAPI()

    const [newdata,setNewData] = useState<PostingListsProps[]>([])
    const [pageObj,setPageObj] = useState<PostingListsProps>({
        page:1,
        pageSize:7
    })

    const Navigate = useNavigate()
    
    const isChildRoute = useMatch('/layout/postingLists');
    console.log("路由",isChildRoute);
    

    const columns: ProColumns<PostingListsProps>[] = [
        {
            title: '帖子Id',
            dataIndex:'postId',
            readonly: true,
        },
        {
            title: '群聊Id',
            dataIndex:'groupId',
        },
        {
            title: '作者Id',
            dataIndex:'userId',
        },
        {
            title: '标题',
            dataIndex:'title',
        },
        {
            title: '类别',
            dataIndex:'category',
        },
        {
            title: '观看量',
            dataIndex:'viewCount',
        },
        {
            title: '点赞量',
            dataIndex:'coinCount',
        },
        {
            title: '发布时间',
            dataIndex:'createTime',
        },
        {
            title: '最近更新',
            dataIndex:'updateTime',
        },
        {
            title: '概述',
            dataIndex:'description',
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: () => [
            <a
                key="editable"
                onClick={(e) => {
                let currentPost_Id = e.currentTarget.parentNode?.parentNode?.parentNode?.children[0].innerHTML
                console.log(currentPost_Id);
                startTransition(()=>{
                    Navigate(`/layout/postingLists/${currentPost_Id}`)
                })
                }}
            >
                查看详情
            </a>
            ],
        },
        ];

    const handleGetProfiles = async ()=>{
        const res = await getPostingLists(pageObj.page,pageObj.pageSize)
        setNewData(exampleRes.data)//服务器有数据后改为res.data
    }

    useEffect(()=>{
        handleGetProfiles()
    },[newdata,pageObj])


    const updateProfiles = async (post_Id:any)=>{
        try{
            const res = await getPostingProfiles(post_Id)  
            if(/^2\d{2}$/.test(res.data.code)){
                // setNewData(res.data)
            }else{
                console.log('查询出错',res.data.msg);
            }
        }catch(error){
            console.log('请求出错', error);
        }
        
    }

    const debounceUpdateProfiles = debounce(updateProfiles,1000)

    const changePageSize = (pageSize:any)=>{
        console.log('更改了pagesize');
        setPageObj({
            ...pageObj,
            pageSize:pageSize
        })
    }

    const changePage = (page:any)=>{
        console.log('更改了page');
        setPageObj({
            ...pageObj,
            page:page
        })
    }

    return (
        <>
        <Outlet/>
        {isChildRoute?.pathname === '/layout/postingLists' && (
            <>
            <div className='flex mb-4'>
            <Search placeholder="请输入您想查询帖子的Id(默认获取所有)" onSearch={debounceUpdateProfiles} style={{ width: 400 }} />
            <h4 className='text-justify py-1 mr-2 ml-4'>每页条数:</h4>
              <InputNumber min={1} max={8} defaultValue={pageObj.pageSize} style={{ width: 60 }} onChange={changePageSize} />
            </div>
            <EditableProTable<PostingListsProps>
            rowKey="id"
            maxLength={5}
            columns={columns}
            request={async () => ({
                data: newdata,
                total: 3,
                success: true,
            })}
            value={newdata}
            onChange={()=>{console.log('数据修改了')}}
            />
            <div className='mt-1'>
                <Pagination 
                align='center'
                defaultCurrent={pageObj.page} 
                onChange={changePage}
                total={pageObj.pageSize * 5}
                pageSize={pageObj.pageSize}
                />
            </div>
            </>
        )}
            

      </>

    )
}