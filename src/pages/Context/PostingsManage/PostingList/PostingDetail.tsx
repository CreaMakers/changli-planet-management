import {getPostingProfiles,delViolatingPosting,reviewReportedPosting} from '@/apis/Handle/HandlePosting.ts'
import {useEffect,useState} from 'react'
import {PostingListsProps} from '@/utils/ModuleProps/PostingItemsProps.ts'
import { Descriptions,Button,Modal,Input } from 'antd';
import type { DescriptionsProps, } from 'antd';
import { useNavigate,Outlet,useParams,useMatch,useLocation } from 'react-router-dom';


//测试例子，服务器有数据后删
let exampleRes = {
    "postId": 1001,
    "groupId": 5,
    "userId": 10086,
    "title": "如何提高编程效率",
    "content": "在本文中,我将分享一些提高编程效率的技巧和工具...",
    "description": "分享一些实用的编程技巧和工具",
    "category": 2,
    "isPinned": true,
    "viewCount": 1500,
    "coinCount": 50,
    "createTime": "2023-04-15 10:30:00",
    "updateTime": "2023-04-15 11:15:00"
      
}

export default function PostingDetil(){

    const location = useLocation();
    const { isReporting } = location.state || false;
    console.log("isReporting",isReporting);
    
    const { postId } = useParams();
    const [postingItem,setPostingItem] = useState<PostingListsProps>(exampleRes)
    const [reviewValue,setReviewValue] = useState<string>('')
    const [reviewAction,setReviewAction] = useState<number>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const Navigate = useNavigate()
    const isChildRoute = useMatch('/layout/postingLists/:postId');
    console.log("帖子详情",isChildRoute);
    

    const items: DescriptionsProps['items'] = [
        {
            label: '帖子Id',
            span: 1,
            children: postingItem.postId,
        },
        {
            label: '群聊Id',
            span: 1,
            children: postingItem.groupId,
        },
        {
            label: '作者Id',
            span: 1,
            children: postingItem.userId,
        },
        {
            label: '类别',
            span: 1,
            children: postingItem.category,
        },
        {
            label: '观看量',
            span: 1,
            children: postingItem.viewCount,
        },
        {
            label: '获赞量',
            span: 1,
            children: postingItem.coinCount,
        },
        {
            label: '被举报',
            span: 1,
            children: postingItem.isPinned.toString() === 'true' ? "是" : "否",
        },
        {
            label: '标题',
            span: 3,
            style:{overflow:"auto"},
            children: postingItem.title,
        },
        {
            label: '概述',
            span: 5,
            style:{maxHeight:84,maxWidth:414,overflow:"auto"},
            children: postingItem.description,
        },
        {
            label: '发布时间',
            span: 2.5,
            children: postingItem.createTime,
        },
        {
            label: '最近更新',
            span: 2.5,
            children: postingItem.updateTime,
        },
        
    ];

    const getCurrentPostingProfiles = async ()=>{
        const res = await getPostingProfiles(postId)
        if(res.data.code === `/^2\d{2}$/`){
            setPostingItem(res.data.data)
        }else{
            console.log(res.data.msg);
        }
        console.log(res.data);
    }

    const showModal = ()=>{
        setIsModalOpen(true)
    }

    const closeModal = ()=>{
        setIsModalOpen(false)
    }

    const handleViewReason = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setReviewValue(event.target.value)
    }
    const showReviewModal = ()=>{
        setIsReviewModalOpen(true)
    }

    const closeReviewModal = ()=>{
        setIsReviewModalOpen(false)
    }

    const handleDelPosting = async ()=>{
        try{
            const res = await delViolatingPosting(postId)
            setIsModalOpen(false)
            if(res.data.code === `/^2\d{2}$/`){
                Navigate('./layout//postingLists')
            }else{
                alert(res.data.msg)
            }
        }catch(error){
            console.log('请求出错',error);
            
        }
    }


    const viewComments = ()=>{
        try{
            Navigate(`/layout/postingLists/${postId}/${postId}`)
        }catch(error){
            console.log('请求出错',error);  
        }
    }

    const handleReportedPosting = async (e:any)=>{
        let value = e.currentTarget.children[0].innerHTML
        let action
        action = value === '审核批准' ?  1 : 0
        setReviewAction(action)
        showReviewModal()
    }

    const sendViewResult = async (e:any)=>{
        setReviewValue(e.currentTarget.parentNode.parentNode.children[1].children[0].children[1].value)
        const res = await reviewReportedPosting(postingItem.postId,reviewAction,reviewValue)
        if(res.data.code === `/^2\d{2}$/`){
            setReviewValue('')
            setIsReviewModalOpen(false)
            Navigate('./layout/postingLists/reportLists')
        }else{
            setReviewValue('')
            setIsReviewModalOpen(false)
            alert(res.data.msg)
        }

        
    }
    useEffect(()=>{
        getCurrentPostingProfiles()
    },[])


    return (
        <>
        <Outlet/>
        {isChildRoute?.pathname === `/layout/postingLists/${postId}`&& (
        <>
            <div className="flex h-full overflow-hidden">
                <div className="w-full h-full">
                    <div className="w-auto h-2/5 overflow-auto">
                        <Descriptions
                            title="帖子详情"
                            extra={
                                <>
                                    {isReporting &&
                                        <>
                                        <Button type="primary" onClick={handleReportedPosting} style={{marginLeft:5,backgroundColor:"green"}}>审核批准</Button>
                                        <Button type="primary" onClick={handleReportedPosting} style={{marginLeft:5,backgroundColor:"red"}}>审核驳回</Button>
                                        </>
                                    }
                                    <Button type="primary" onClick={showModal} style={{marginLeft:5,backgroundColor:"red"}}>删除</Button>
                                    <Button type="primary" onClick={viewComments} style={{marginLeft:5}}>查看评论</Button>
                                </>
                            }
                            bordered
                            size="small"
                            column={5}
                            items={items}
                        />
                    </div>
                    <div className="w-full h-3/5 overflow-y-scroll p-4 bg-slate-100 rounded-md"> 
                    {postingItem.content}
                    </div>
                </div>
            </div>
            <Modal  open={isModalOpen} onOk={handleDelPosting} onCancel={closeModal}>
                <div className='flex flex-col h-26 w-[470px] mt-8'>
                    <h3>您确定删除该帖子吗</h3>
                </div>      
            </Modal>
            <Modal  open={isReviewModalOpen} onOk={sendViewResult} onCancel={closeReviewModal}>
                <div className='flex flex-col h-26 w-[470px] mt-8'>
                    <h3>审核原因：</h3>
                    <textarea  value={reviewValue} onChange={handleViewReason} className="block bg-slate-100 h-32 justify-start p-2"/>
                </div>      
            </Modal>
        </>)}
        </>
    ) 
}