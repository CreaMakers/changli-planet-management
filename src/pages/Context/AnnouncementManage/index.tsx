import {getAllAnnouncementList,getAnnouncementDetails} from '@/apis/Handle/index'
import {AnnouncementProps} from '@/utils/ModuleProps/AnnouncementProps.ts'
import {useEffect,useState } from 'react'
import { Input,InputNumber,Pagination } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import {EditableProTable} from '@ant-design/pro-components';
import { Outlet, useNavigate,useMatch } from 'react-router-dom';
import { startTransition } from 'react'
import {useGeneralAPI} from '@/apis/CustomizationHooks/GeneralAPI/index.ts'
const { Search } = Input;


//测试用例(数据库更新数据后删)
let exampleRes = {
    "code": 200,
    "msg": "success",
    "data": [
        {
            "announcementId": 1001,
            "groupId": 5,
            "userId": 10086,
            "title": "群规更新通知",
            "content": "亲爱的群成员们,我们最近对群规进行了一些更新...",
            "isPinned": true,
            "createTime": "2023-04-15T10:30:00Z",
            "updateTime": "2023-04-15T10:30:00Z",
            "isDeleted": false,
            "description": "关于群规的重要更新"
          },
          {
            "announcementId": 1002,
            "groupId": 5,
            "userId": 10087,
            "title": "周末活动安排",
            "content": "本周末我们将举行线下聚会,具体安排如下...",
            "isPinned": false,
            "createTime": "2023-04-16T14:20:00Z",
            "updateTime": "2023-04-16T14:20:00Z",
            "isDeleted": false,
            "description": "本周末的线下聚会安排"
          }
    ]
}
  
export default function AnnouncementList(){

    const { debounce } = useGeneralAPI()

    const [newdata,setNewData] = useState<AnnouncementProps[]>([])
    const [pageObj,setPageObj] = useState<AnnouncementProps>({
        page:1,
        pageSize:7
    })

    const Navigate = useNavigate()
    
    const isChildRoute = useMatch('/layout/announcementLists');
    console.log("路由",isChildRoute);
    

    const columns: ProColumns<AnnouncementProps>[] = [
        {
            title: '公告Id',
            dataIndex:'announcementId',
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
                let announcementId = e.currentTarget.parentNode?.parentNode?.parentNode?.children[0].innerHTML
                console.log(announcementId);
                startTransition(()=>{
                    Navigate(`/layout/announcementLists/${announcementId}`)
                })
                }}
            >
                查看详情
            </a>
            ],
        },
        ];

    const handleGetProfiles = async ()=>{
        const res = await getAllAnnouncementList(pageObj.page,pageObj.pageSize)
        setNewData(exampleRes.data)//服务器有数据后改为res.data
    }

    useEffect(()=>{
        handleGetProfiles()
    },[newdata,pageObj])


    const updateProfiles = async (announcementId:any)=>{
        try{
            const res = await getAnnouncementDetails(announcementId)  
            if(res.data.code === `/^2\d{2}$/`){
                setNewData(res.data?.data)
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
        {isChildRoute?.pathname === '/layout/announcementLists' && (
            <>
            <div className='flex mb-4'>
            <Search placeholder="请输入您想查询公告的Id(默认获取所有)" onSearch={debounceUpdateProfiles} style={{ width: 400 }} />
            <h4 className='text-justify py-1 mr-2 ml-4'>每页条数:</h4>
              <InputNumber min={1} max={8} defaultValue={pageObj.pageSize} style={{ width: 60 }} onChange={changePageSize} />
            </div>
            <EditableProTable<AnnouncementProps>
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