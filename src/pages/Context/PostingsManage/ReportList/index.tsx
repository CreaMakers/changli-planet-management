import {getReportedPostingProfiles} from '@/apis/Handle/index'
import {ReportedPostingProps} from '@/utils/ModuleProps/PostingItemsProps.ts'
import {useEffect,useState } from 'react'
import { Input,InputNumber,Pagination,Modal } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import {EditableProTable} from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react'
import {useGeneralAPI} from '@/apis/CustomizationHooks/GeneralAPI/index.ts'
const { Search } = Input;

interface pageObjProps {
    page:number,
    pageSize:number
}

//测试用例(数据库更新数据后删)
let exampleRes = {
    "code": 200,
    "msg": "success",
    "data": [
        {
            "reportId": 1001,
            "postId": 1005,
            "reporterId": 10100,
            "reason": "不当内容",
            "reportTime": "2024-10-28T09:30:23Z",
            "status": 0,
            "processDescription": null,
            "isDeleted": false,
            "createTime": "2024-10-28T09:30:23Z",
            "updateTime": "2024-10-28T09:30:23Z",
            "description": "用户举报不当内容"
        },
        {
            "reportId": 1002,
            "postId": 1005,
            "reporterId": 10101,
            "reason": "违反社区规则",
            "reportTime": "2024-10-28T09:30:23Z",
            "status": 0,
            "processDescription": null,
            "isDeleted": false,
            "createTime": "2024-10-28T09:30:23Z",
            "updateTime": "2024-10-28T09:30:23Z",
            "description": "用户举报违反社区规则"
        },
        {
            "reportId": 1002,
            "postId": 1005,
            "reporterId": 10101,
            "reason": "违反社区规则",
            "reportTime": "2024-10-28T09:30:23Z",
            "status": 0,
            "processDescription": null,
            "isDeleted": false,
            "createTime": "2024-10-28T09:30:23Z",
            "updateTime": "2024-10-28T09:30:23Z",
            "description": "用户举报违反社区规则"
        },
        {
            "reportId": 1002,
            "postId": 1005,
            "reporterId": 10101,
            "reason": "违反社区规则",
            "reportTime": "2024-10-28T09:30:23Z",
            "status": 0,
            "processDescription": null,
            "isDeleted": false,
            "createTime": "2024-10-28T09:30:23Z",
            "updateTime": "2024-10-28T09:30:23Z",
            "description": "用户举报违反社区规则"
        },
        {
            "reportId": 1002,
            "postId": 1005,
            "reporterId": 10101,
            "reason": "违反社区规则",
            "reportTime": "2024-10-28T09:30:23Z",
            "status": 0,
            "processDescription": null,
            "isDeleted": false,
            "createTime": "2024-10-28T09:30:23Z",
            "updateTime": "2024-10-28T09:30:23Z",
            "description": "用户举报违反社区规则"
        },
        {
            "reportId": 1002,
            "postId": 1005,
            "reporterId": 10101,
            "reason": "违反社区规则",
            "reportTime": "2024-10-28T09:30:23Z",
            "status": 0,
            "processDescription": null,
            "isDeleted": false,
            "createTime": "2024-10-28T09:30:23Z",
            "updateTime": "2024-10-28T09:30:23Z",
            "description": "用户举报违反社区规则"
        },
        {
            "reportId": 1002,
            "postId": 1005,
            "reporterId": 10101,
            "reason": "违反社区规则",
            "reportTime": "2024-10-28T09:30:23Z",
            "status": 0,
            "processDescription": null,
            "isDeleted": false,
            "createTime": "2024-10-28T09:30:23Z",
            "updateTime": "2024-10-28T09:30:23Z",
            "description": "用户举报违反社区规则"
        },
        {
            "reportId": 1002,
            "postId": 1005,
            "reporterId": 10101,
            "reason": "违反社区规则",
            "reportTime": "2024-10-28T09:30:23Z",
            "status": 0,
            "processDescription": null,
            "isDeleted": false,
            "createTime": "2024-10-28T09:30:23Z",
            "updateTime": "2024-10-28T09:30:23Z",
            "description": "用户举报违反社区规则"
        },
    ]
}

export default function ReportList(){
    const { debounce } = useGeneralAPI()

    const [newdata,setNewData] = useState<ReportedPostingProps[]>(exampleRes.data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<ReportedPostingProps>({});
    const [pageObj,setPageObj] = useState<pageObjProps>({
        page:1,
        pageSize:8
    })

    const Navigate = useNavigate()
    
    const columns: ProColumns<ReportedPostingProps>[] = [
        {
            title: 'Id',
            dataIndex:'reportId',
            readonly: true,
        },
        {
            title: '帖子Id',
            dataIndex:'postId',
        },
        {
            title: '举报者Id',
            dataIndex:'reporterId',
        },
        {
            title: '举报原因',
            dataIndex:'reason',
        },
        {
            title: '举报时间',
            dataIndex:'reportTime',
        },
        {
            title: '被举报帖发布时间',
            dataIndex:'createTime',
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={(e) => {
                let currentReport_Id = e.currentTarget.parentNode?.parentNode?.parentNode?.children[0].innerHTML
                if(currentReport_Id){
                    viewReportDetail(currentReport_Id)
                }
                console.log(currentReport_Id);
                // startTransition(()=>{
                //     Navigate(`/layout/postingLists/${currentPost_Id}`)
                // })
                }}
            >
                查看详情
            </a>
            ],
        },
        ];

    useEffect(()=>{
        updateProfiles()
    },[newdata,pageObj])

    const showModal = ()=>{
        setIsModalOpen(true)
    }

    const closeModal = ()=>{
        setIsModalOpen(false)
    }

    const viewReportDetail = (currentReport_Id:number | string)=>{
        let arr = newdata.filter((item)=>item.reportId == currentReport_Id)
        setModalData(arr[0])  
        showModal()
    }

    const viewCorrespondingPosting = (e:any)=>{
        const postId = e.currentTarget.parentNode.parentNode.children[1].children[0].children[0].children[1].innerHTML.slice(8) 
        Navigate(`/layout/postingLists/${postId}`, { state: { isReporting:true} })
        closeModal()
    }

    const updateProfiles = async ()=>{
        try{
            const res = await getReportedPostingProfiles(pageObj.page,pageObj.pageSize)  
            if(/^2\d{2}$/.test(res.data.code)){
                console.log("获取举报列表成功");

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
            <div className='flex mb-4'>
            <Search placeholder="请输入您想查询帖子的Id(默认获取所有)" onSearch={debounceUpdateProfiles} style={{ width: 400 }} />
            <h4 className='text-justify py-1 mr-2 ml-4'>每页条数:</h4>
              <InputNumber min={1} max={8} defaultValue={pageObj.pageSize} style={{ width: 60 }} onChange={changePageSize} />
            </div>
            <EditableProTable<ReportedPostingProps>
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
            <Modal  open={isModalOpen} onOk={viewCorrespondingPosting} onCancel={closeModal} okText="查看对应帖子详情">
                <div className='flex flex-col h-96 w-[490px] mt-8 overflow-hidden'>
                <ul className='p-4 overflow-y-scroll border-l-sky-100 bg-slate-100 w-[458px] h-88 rounded-xl whitespace-pre-wrap'>
                    {Object.entries(modalData).map(([key, value]:ReportedPostingProps[], index)=>{
                        value = JSON.stringify(value)
                        return (
                            <li key={index} className="p-2">{key}: {value}</li>
                        )
                    })}
                </ul>
            </div>     
            </Modal>
            </> 
    )
}