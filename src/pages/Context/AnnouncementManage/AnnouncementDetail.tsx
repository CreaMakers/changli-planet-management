import {getAnnouncementDetails,delAnnouncement,editCurrentAnnouncement} from '@/apis/Handle/HandleAnnounce.ts'
import {useEffect,useState,startTransition} from 'react'
import {AnnouncementProps} from '@/utils/ModuleProps/AnnouncementProps.ts'
import { Descriptions,Button,Modal } from 'antd';
import type { DescriptionsProps, } from 'antd';
import { useNavigate,Outlet,useParams,useMatch } from 'react-router-dom';

interface updatedDataProps {
    title: string,
    content: string,
    isPinned: boolean,
    description: string
}

//测试例子，服务器有数据后删
// let exampleRes = {
//     "announcementId": 1001,
//     "groupId": 5,
//     "userId": 10086,
//     "title": "群规更新通知",
//     "content": "亲爱的群成员们,我们最近对群规进行了一些更新...",
//     "isPinned": true,
//     "createTime": "2023-04-15T10:30:00Z",
//     "updateTime": "2023-04-15T10:30:00Z",
//     "isDeleted": false,
//     "description": "关于群规的重要更新"
//   }

export default function AnnouncementDetil(){

    
    const { announcementId } = useParams();
    const [announcementItem,setAnnouncementItem] = useState<AnnouncementProps>({})
    const [isEdit,setIsEdit] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const Navigate = useNavigate()
    const isChildRoute = useMatch('/layout/announcementLists/:announcementId');
    
    const updateTitleDate = (text:any)=>{
        setAnnouncementItem({
            ...announcementItem,
            title:text.target?.value
        })
    }
    const updateDescriptionDate = (text:any)=>{
        setAnnouncementItem({
            ...announcementItem,
            description:text.target?.value
        })
    }
    const updateIsPinned = (text:any)=>{
        setAnnouncementItem({
            ...announcementItem,
            isPinned:text.target?.value
        })
    }
    const updateContentDate = (text:any)=>{
        setAnnouncementItem({
            ...announcementItem,
            content:text.target?.value
        })
    }


    const items: DescriptionsProps['items'] = [
        {
            label: '公告Id',
            span: 2,
            children: announcementItem.announcementId,
        },
        {
            label: '群聊Id',
            span: 1,
            children: announcementItem.groupId,
        },
        {
            label: '作者Id',
            span: 1,
            children: announcementItem.userId,
        },
        {
            label: '被删除',
            span: 1,
            children: announcementItem.isDeleted?.toString() === 'true' ? "是" : "否",
        },
        {
            label: '顶置',
            span: 1,
            children: isEdit 
            ? <select className='border-none' onChange={updateIsPinned}>
                <option value={"true"}>是</option>
                <option value={"false"} selected>否</option>
              </select> 
            : <>{announcementItem.isPinned?.toString() === 'true' ? "是" : "否"}</>,
            
        },
        {
            label: '标题',
            span: 3,
            style:{overflow:"auto"},
            children: isEdit ? <input className='block w-full border-none outline-none' placeholder={announcementItem.title} autoFocus onChange={updateTitleDate}/> : <>{announcementItem.title}</>,
        },
        {
            label: '概述',
            span: 3,
            style:{maxHeight:84,maxWidth:414,overflow:"auto"},
            children: isEdit ? <input className='block w-full border-none outline-none' placeholder={announcementItem.description} autoFocus onChange={updateDescriptionDate}/> : <>{announcementItem.description}</>,
        },
        {
            label: '发布时间',
            span: 3,
            children: announcementItem.createTime,
        },
        {
            label: '最近更新',
            span: 3,
            children: announcementItem.updateTime,
        },
        
    ];

    const getCurrentPostingProfiles = async ()=>{
        const res = await getAnnouncementDetails(announcementId)
        if(/^2\d{2}$/.test(res.data.code)){
            setAnnouncementItem(res.data.data)
            console.log("sss");
        }else{
            console.log("",res.data.msg);
        }
        console.log(res.data);
    }

    const showModal = ()=>{
        setIsModalOpen(true)
    }

    const closeModal = ()=>{
        setIsModalOpen(false)
    }

    const handleDelAnnouncement = async ()=>{
        try{
            const res = await delAnnouncement(announcementId)
            setIsModalOpen(false)
            if(/^2\d{2}$/.test(res.data.code)){
                Navigate('./layout/announcementLists')
            }else{
                alert(res.data.msg)
            }
        }catch(error){
            console.log('请求出错',error);
            
        }
    }

    const handleEdit = async (e:any)=>{
        let updatedData:updatedDataProps = {
            title: announcementItem.title,
            content: announcementItem.content,
            isPinned: announcementItem.isPinned,
            description: announcementItem.description
        }
        if(isEdit){
            const res = await editCurrentAnnouncement(announcementId,updatedData)
            console.log("修改后的公告信息",res);
        }
        setIsEdit(!isEdit)
    }

    const handleBack = ()=>{
        startTransition(()=>{
            Navigate(`/layout/announcementLists`)
        })
    }

    useEffect(()=>{
        getCurrentPostingProfiles()
    },[])


    return (
        <>
        <Outlet/>
        {isChildRoute?.pathname === `/layout/announcementLists/${announcementId}`&& (
        <>
            <div className="flex h-full overflow-hidden">
                <div className="w-full h-full">
                    <div className="w-auto h-2/6 overflow-auto">
                        <Descriptions
                            title="帖子详情"
                            extra={
                                <>
                                  <Button type="primary" onClick={handleEdit} style={{marginLeft:5,backgroundColor:"green"}}>{isEdit ? "结束编辑" : "编辑"}</Button>
                                  <Button type="primary" onClick={showModal} style={{marginLeft:5,backgroundColor:"red"}}>删除</Button>
                                  <Button type="primary" onClick={handleBack} style={{marginLeft:5,backgroundColor:"blue"}}>返回</Button>
                                </>
                            }
                            bordered
                            size="small"
                            column={6}
                            items={items}
                        />
                    </div>
                    <div className="w-full h-4/6 overflow-y-scroll p-4 bg-slate-100 rounded-md"> 
                    {isEdit 
                    ? <textarea placeholder={announcementItem.content} className='bg-inherit w-full h-full border-none outline-none text-wrap top-0' autoFocus onChange={updateContentDate}/> 
                    : announcementItem.content}
                    </div>
                </div>
            </div>
            <Modal  open={isModalOpen} onOk={handleDelAnnouncement} onCancel={closeModal}>
                <div className='flex flex-col h-26 w-[470px] mt-8'>
                    <h3>您确定删除该公告吗</h3>
                </div>      
            </Modal>
        </>)}
        </>
    ) 
}