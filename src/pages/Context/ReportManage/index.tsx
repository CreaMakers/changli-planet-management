import {ReportItemProps} from '@/utils/ModuleProps/ReportItemProps.ts'
import {getAllReports} from '@/apis/Handle/index'
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
            "reportId": 1,
            "reportedUserId": 2002,
            "reporterId": 2001,
            "reason": "发布不当言论",
            "reportTime": "2024-09-21 08:00:00",
            "status": 0,
            "processDescription": "等待管理员审核",
            "isDeleted": 0,
            "createTime": "2024-09-21 08:00:00",
            "updateTime": "2024-09-21 08:00:00",
            "description": "用户举报另一用户发布了不当言论"
        },
        {
            "reportId": 2,
            "reportedUserId": 2003,
            "reporterId": 2004,
            "reason": "骚扰其他用户",
            "reportTime": "2024-09-21 09:00:00",
            "status": 1,
            "processDescription": "已警告并暂时禁言",
            "isDeleted": 0,
            "createTime": "2024-09-21 09:00:00",
            "updateTime": "2024-09-21 09:30:00",
            "description": "用户举报另一用户对其进行了骚扰"
        },
        {
            "reportId": 3,
            "reportedUserId": 2005,
            "reporterId": 2006,
            "reason": "盗用他人身份",
            "reportTime": "2024-09-21 10:00:00",
            "status": 0,
            "processDescription": "正在调查中",
            "isDeleted": 0,
            "createTime": "2024-09-21 10:00:00",
            "updateTime": "2024-09-21 10:00:00",
            "description": "用户举报另一用户盗用了其身份"
        },
        {
            "reportId": 4,
            "reportedUserId": 2007,
            "reporterId": 2008,
            "reason": "发布虚假信息",
            "reportTime": "2024-09-21 11:00:00",
            "status": 1,
            "processDescription": "已删除虚假信息并警告用户",
            "isDeleted": 0,
            "createTime": "2024-09-21 11:00:00",
            "updateTime": "2024-09-21 11:30:00",
            "description": "用户举报另一用户发布了虚假信息"
        },
        {
            "reportId": 5,
            "reportedUserId": 2009,
            "reporterId": 2010,
            "reason": "滥用平台功能",
            "reportTime": "2024-09-21 12:00:00",
            "status": 0,
            "processDescription": "等待进一步证据",
            "isDeleted": 0,
            "createTime": "2024-09-21 12:00:00",
            "updateTime": "2024-09-21 12:00:00",
            "description": "用户举报另一用户滥用平台功能"
        }
    ]
}
export default function ReportList(){
    const { debounce } = useGeneralAPI()

    const [newdata,setNewData] = useState<ReportItemProps[]>([])
    const [pageObj,setPageObj] = useState<ReportItemProps>({
        page:1,
        pageSize:7
    })

    const Navigate = useNavigate()
    
    const isChildRoute = useMatch('/layout/reportLists');
    console.log("路由",isChildRoute);
    

    const columns: ProColumns<ReportItemProps>[] = [
        {
            title: 'Id',
            dataIndex:'reportId',
            align:"center",
            readonly: true,
        },
        {
            title: '被举报者Id',
            align:"center",
            dataIndex:'reportedUserId',
        },
        {
            title: '举报者Id',
            align:"center",
            dataIndex:'reporterId',
        },
        {
            title: '举报原因',
            align:"center",
            dataIndex:'reason',
        },
        {
            title: '举报时间',
            align:"center",
            dataIndex:'reportTime',
        },
        {
            title: '处理进程',
            align:"center",
            dataIndex:'processDescription',
        },
        {
            title: '概述',
            align:"center",
            dataIndex:'description',
        },
        {
            title: '操作',
            valueType: 'option',
            align:"center",
            render: () => [
            <a
                key="editable"
                onClick={(e) => {
                let reportId = e.currentTarget.parentNode?.parentNode?.parentNode?.children[0].innerHTML
                console.log(reportId);
                const obj = newdata.filter((item)=>item.reportId == reportId)[0]
                console.log(obj);
                startTransition(()=>{
                    Navigate(`/layout/reportLists/${reportId}`,{state:{reportedUserId:obj.reportedUserId,description:obj.description}})
                })
                }}
            >
                处理举报
            </a>
            ],
        },
        ];

    const handleGetProfiles = async ()=>{
        const res = await getAllReports(pageObj.page,pageObj.pageSize)
        setNewData(exampleRes.data)//服务器有数据后改为res.data
    }

    useEffect(()=>{
        handleGetProfiles()
    },[newdata,pageObj])


    const updateProfiles = async (reportId:any)=>{
            const res = await getAllReports(reportId)  
            if(/^2\d{2}$/.test(res.data.code)){
                setNewData(res.data?.data)
            }else{
                console.log('查询出错',res.data.msg);
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
        {isChildRoute?.pathname === '/layout/reportLists' && (
            <>
            <div className='flex mb-4'>
            <Search value="目前只支持获取全部" onSearch={debounceUpdateProfiles} style={{ width: 400 }} />
            <h4 className='text-justify py-1 mr-2 ml-4'>每页条数:</h4>
              <InputNumber min={1} max={8} defaultValue={pageObj.pageSize} style={{ width: 60 }} onChange={changePageSize} />
            </div>
            <EditableProTable<ReportItemProps>
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