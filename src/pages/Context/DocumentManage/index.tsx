import {DocumentsProps} from '@/utils/ModuleProps/DocumentsProps.ts'
import {getAllDocuments,delDocument} from '@/apis/Handle/HandleDocument.ts'
import {useEffect,useState } from 'react'
import { Input,InputNumber,Pagination,Modal} from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import {EditableProTable} from '@ant-design/pro-components';
import {useGeneralAPI} from '@/apis/CustomizationHooks/GeneralAPI/index.ts'
const { Search } = Input;

interface searchObjProps {
    fileType:number,
    page:number,
    pageSize:number
}

//测试用例(数据库更新数据后删)
let exampleRes = {
    "code": 200,
    "msg": "success",
    "data": [
        {
            "fileId": 1,
            "groupId": 1001,
            "userId": 2001,
            "fileName": "会议纪要.pdf",
            "fileSize": 256000,
            "fileType": 2,
            "fileUrl": "https://example.com/files/meeting_notes.pdf",
            "createTime": "2024-09-21T08:00:00Z",
            "updateTime": "2024-09-21T08:00:00Z",
            "isDeleted": false,
            "description": "上周会议的纪要文件"
          },
          {
            "fileId": 2,
            "groupId": 1002,
            "userId": 2002,
            "fileName": "设计稿.png",
            "fileSize": 128000,
            "fileType": 1,
            "fileUrl": "https://example.com/files/design_draft.png",
            "createTime": "2024-09-21T09:00:00Z",
            "updateTime": "2024-09-21T09:00:00Z",
            "isDeleted": false,
            "description": "最新设计稿截图"
          },
          {
            "fileId": 3,
            "groupId": 1003,
            "userId": 2003,
            "fileName": "项目报告.docx",
            "fileSize": 512000,
            "fileType": 2,
            "fileUrl": "https://example.com/files/project_report.docx",
            "createTime": "2024-09-21T10:00:00Z",
            "updateTime": "2024-09-21T10:00:00Z",
            "isDeleted": false,
            "description": "本月项目进展报告"
          },
          {
            "fileId": 4,
            "groupId": 1004,
            "userId": 2004,
            "fileName": "演示视频.mp4",
            "fileSize": 5000000,
            "fileType": 3,
            "fileUrl": "https://example.com/files/presentation_video.mp4",
            "createTime": "2024-09-21T11:00:00Z",
            "updateTime": "2024-09-21T11:00:00Z",
            "isDeleted": false,
            "description": "产品演示视频"
          },
          {
            "fileId": 5,
            "groupId": 1005,
            "userId": 2005,
            "fileName": "会议录音.m4a",
            "fileSize": 1024000,
            "fileType": 4,
            "fileUrl": "https://example.com/files/meeting_recording.m4a",
            "createTime": "2024-09-21T12:00:00Z",
            "updateTime": "2024-09-21T12:00:00Z",
            "isDeleted": false,
            "description": "会议录音文件"
          },
          {
            "fileId": 6,
            "groupId": 1006,
            "userId": 2006,
            "fileName": "代码.zip",
            "fileSize": 3072000,
            "fileType": 5,
            "fileUrl": "https://example.com/files/code.zip",
            "createTime": "2024-09-21T13:00:00Z",
            "updateTime": "2024-09-21T13:00:00Z",
            "isDeleted": false,
            "description": "最新的代码包"
          },
          {
            "fileId": 7,
            "groupId": 1007,
            "userId": 2007,
            "fileName": "市场分析.xlsx",
            "fileSize": 768000,
            "fileType": 2,
            "fileUrl": "https://example.com/files/market_analysis.xlsx",
            "createTime": "2024-09-21T14:00:00Z",
            "updateTime": "2024-09-21T14:00:00Z",
            "isDeleted": false,
            "description": "市场分析报告"
          },
          {
            "fileId": 8,
            "groupId": 1008,
            "userId": 2008,
            "fileName": "会议安排.pptx",
            "fileSize": 1024000,
            "fileType": 2,
            "fileUrl": "https://example.com/files/meeting_schedule.pptx",
            "createTime": "2024-09-21T15:00:00Z",
            "updateTime": "2024-09-21T15:00:00Z",
            "isDeleted": false,
            "description": "下周会议安排"
          },
    ]
}

export default function DocumentList(){
    const { debounce } = useGeneralAPI()

    const [newdata,setNewData] = useState<DocumentsProps[]>(exampleRes.data)
    const [delFileId,setDelFileId] = useState<number>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchObj,setSearchObj] = useState<searchObjProps>({
        fileType:1,
        page:1,
        pageSize:8
    })

    const deleteFile = async ()=>{
        const res = await delDocument(delFileId)
        if(/^2\d{2}$/.test(res.data.code)){
            console.log("删除文件成功");
            updateProfiles()
        }else{
            console.log('查询出错',res.data.msg);
        }
        closeModal()
    }

    const columns: ProColumns<DocumentsProps>[] = [
        {
            title: '文件Id',
            dataIndex:'fileId',
            align:"center",
            readonly: true,
        },
        {
            title: '群聊Id',
            dataIndex:'groupId',
            align:"center",
        },
        {
            title: '用户Id',
            dataIndex:'userId',
            align:"center",
        },
        {
            title: '文件名',
            dataIndex:'fileName',
            align:"center",
            render:(value)=>[
                <span>{value?.toString().replace(/\.[^/.]+$/, '')}</span>
            ]
        },
        {
            title: '文件大小',
            dataIndex:'fileSize',
            align:"center",
        },
        {
            title: '类型',
            dataIndex:'fileType',
            align:"center",
            render:(value)=>[
                value === 1 && <span>图片</span>,
                value === 2 && <span>文档</span>,
                value === 3 && <span>视频</span>,
                value === 4 && <span>音频</span>,
                value === 5 && <span>其他</span>
            ]
        },
        {
            title: '链接',
            dataIndex:'fileUrl',
            align:"center",
            render:(value)=>[
                <a href={value?.toString()} target='_blank'>{value}</a>
            ]
        },
        {
            title: '创建时间',
            dataIndex:'createTime',
            align:"center",
        },
        {
            title: '最近更新',
            dataIndex:'updateTime',
            align:"center",
        },
        {
            title: '被删除',
            dataIndex:'isDeleted',
            align:"center",
            render:(value)=>[
                <span>{value === true ? "是" : "否"}</span>
            ]
        },
        {
            title: '描述',
            dataIndex:'description',
            align:"center",
            width:150,
            render:(value)=>[
                <span className='overflow-x-scroll'>{value}</span>
            ]
        },
        {
            title: '操作',
            valueType: 'option',
            align:"center",
            render: () => [
            <a
                style={{color:"red"}}
                onClick={(e) => {
                let currentFile_Id = e.currentTarget.parentNode?.parentNode?.parentNode?.children[0].innerHTML
                console.log(currentFile_Id);
                currentFile_Id && setDelFileId(parseInt(currentFile_Id))
                showModal()
                }}
            >
                删除
            </a>
            ],
        },
        ];

    useEffect(()=>{
        updateProfiles()
    },[newdata,searchObj])


    const updateProfiles = async ()=>{
        const res = await getAllDocuments(searchObj.page,searchObj.pageSize,searchObj.fileType)  
        if(/^2\d{2}$/.test(res.data.code)){
            console.log("获取文件列表成功");
            setNewData(res.data.data)
        }else{
            console.log('查询出错',res.data.msg);
        }
    }

    const debounceUpdateProfiles = debounce(updateProfiles,1000)
    const debounceDeleteFile = debounce(deleteFile,1000)

    const changePageSize = (pageSize:any)=>{
        console.log('更改了pagesize');
        setSearchObj({
            ...searchObj,
            pageSize:pageSize
        })
    }

    const changePage = (page:any)=>{
        console.log('更改了page');
        setSearchObj({
            ...searchObj,
            page:page
        })
    }

    const changeFileType = (fileType:any)=>{
        setSearchObj({
            ...searchObj,
            fileType:parseInt(fileType.target.value)
        })
    }

    const showModal = ()=>{
        setIsModalOpen(true)
    }

    const closeModal = ()=>{
        setIsModalOpen(false)
    }

    return (
            <>
            <div className='flex mb-4'>
            <Search value="目前只支持获取全部" onSearch={debounceUpdateProfiles} style={{ width: 400 }} />
            <h4 className='text-justify py-1 mr-2 ml-4'>每页条数:</h4>
            <InputNumber min={1} max={8} defaultValue={searchObj.pageSize} style={{ width: 60 }} onChange={changePageSize} />
            <h4 className='text-justify py-1 ml-4'>文件类型:</h4>
            <select className='w-20 text-center border-stone-500' onChange={changeFileType}>
                <option value={1}>图片</option>
                <option value={2}>文档</option>
                <option value={3}>视频</option>
                <option value={4}>音频</option>
                <option value={5}>其他</option>
            </select>
            </div>
            <EditableProTable<DocumentsProps>
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
                defaultCurrent={searchObj.page} 
                onChange={changePage}
                total={searchObj.pageSize * 5}
                pageSize={searchObj.pageSize}
                />
            </div>
            <Modal  open={isModalOpen} onOk={debounceDeleteFile} onCancel={closeModal}>
                <div className='flex flex-col h-26 w-[470px] mt-8'>
                    <h3>您确定删除该文件吗</h3>
                </div>      
            </Modal>
            </> 
    )
}
