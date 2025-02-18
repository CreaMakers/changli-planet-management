import {getPostingAllComments,searchComment,delComment} from '@/apis/Handle/index'
import {useEffect,useState} from 'react'
import { Avatar, Divider, List, Skeleton,Button,Modal,Input } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useGeneralAPI} from '@/apis/CustomizationHooks/GeneralAPI/index.ts'
import { useParams } from 'react-router-dom';
import {CommentsProps} from '@/utils/ModuleProps/PostingItemsProps.ts'

//测试用例，服务器有数据后删
const exampleRes = {
    "code": "200",
    "msg": "success",
    "data": [
        {
        "commentId": 2001,
        "postId": 1001,
        "userId": 10087,
        "parentCommentId": null,
        "content": "非常实用的文章,谢谢分享!",
        "createTime": "2023-04-15 11:00:00",
        "updateTime": "2023-04-15 11:00:00",
        "isDeleted": false,
        "description": "对文章的总体评价"
        },
        {
        "commentId": 2002,
        "postId": 1001,
        "userId": 10088,
        "parentCommentId": 2001,
        "content": "我也有类似的经验,补充一点...",
        "createTime": "2023-04-15 11:30:00",
        "updateTime": "2023-04-15 11:30:00",
        "isDeleted": false,
        "description": "对上一条评论的回复"
        },
        {
        "commentId": 2003,
        "postId": 1001,
        "userId": 10088,
        "parentCommentId": null,
        "content": "我也有类似的经验,补充一点...",
        "createTime": "2023-04-15 11:30:00",
        "updateTime": "2023-04-15 11:30:00",
        "isDeleted": false,
        "description": "对上一条评论的回复"
        },
        {
        "commentId": 2004,
        "postId": 1001,
        "userId": 10088,
        "parentCommentId":null,
        "content": "我也有类似的经验,补充一点...",
        "createTime": "2023-04-15 11:30:00",
        "updateTime": "2023-04-15 11:30:00",
        "isDeleted": false,
        "description": "对上一条评论的回复"
        },
        {
        "commentId": 2005,
        "postId": 1001,
        "userId": 10088,
        "parentCommentId": 2004,
        "content": "我也有类似的经验,补充一点...",
        "createTime": "2023-04-15 11:30:00",
        "updateTime": "2023-04-15 11:30:00",
        "isDeleted": false,
        "description": "对上一条评论的回复"
        },
        {
        "commentId": 2006,
        "postId": 1001,
        "userId": 10088,
        "parentCommentId": null,
        "content": "我也有类似的经验,补充一点嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻原神启动嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎阿嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎阿嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎给啊嘎嘎嘎嘎啊哥哥挨个挨个挨个 嘎嘎啊嘎嘎挨个...",
        "createTime": "2023-04-15 11:30:00",
        "updateTime": "2023-04-15 11:30:00",
        "isDeleted": false,
        "description": "对上一条评论的回复"
        },
        {
        "commentId": 2007,
        "postId": 1001,
        "userId": 10088,
        "parentCommentId": null,
        "content": "我也有类似的经验,补充一点...",
        "createTime": "2023-04-15 11:30:00",
        "updateTime": "2023-04-15 11:30:00",
        "isDeleted": false,
        "description": "对上一条评论的回复"
        },
        {
        "commentId": 2008,
        "postId": 1001,
        "userId": 10088,
        "parentCommentId": 2007,
        "content": "我也有类似的经验,补充一点...",
        "createTime": "2023-04-15 11:30:00",
        "updateTime": "2023-04-15 11:30:00",
        "isDeleted": false,
        "description": "对上一条评论的回复"
        },
    ]
}

const { Search } = Input;
export default function PostingComments(){
    
    const { postId } = useParams();
    const [data, setData] = useState<CommentsProps[]>(exampleRes.data);
    const [modalData, setModalData] = useState<CommentsProps>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageObj,setPageObj] = useState({
        page:1,
        pageSize:10
    })
    const {debounce} = useGeneralAPI()

    const getComments = async (keyword?:string) => {
        // if (loading) {
        // return;
        // }
        // setLoading(true);

        if(keyword){
            const res = await searchComment(postId,pageObj.page,pageObj.pageSize,keyword)
            console.log("搜索指定评论",res);
            if(res.data.code === `/^2\d{2}$/`){
                setPageObj(res.data?.data)
            }else{
                console.log("查询出错",res.data.msg); 
            }
        }else{
            const res = await getPostingAllComments(postId,pageObj.page,pageObj.pageSize)
            if(res.data.code === `/^2\d{2}$/`){
                setPageObj(res.data?.data)
            }else{
                console.log("查询出错",res.data.msg); 
            }
        }
        
    };

    const showModal = (e:any)=>{
        let commentId = e.currentTarget.parentNode.children[0].children[1].children[0].children[0].innerHTML
        let arr = data.filter((item)=>item.commentId == commentId)
        console.log(arr[0]);
        setModalData(arr[0])
        setIsModalOpen(true)
    }

    const closeModal = ()=>{
        setIsModalOpen(false)
    }

    const deleteComment = async (e:any)=>{
        let commentId = e.currentTarget.parentNode.children[0].children[1].children[0].children[0].innerHTML
        const res = await delComment(postId,commentId)
        console.log("删除评论",res);
        if(res.data.code === `/^2\d{2}$/`){
            alert('删除成功')
            getComments()
        }else{
            console.log("查询出错",res.data.msg); 
        }
        
    }

  const debounceGetComments = debounce(getComments,1000)

    return (
        <>
        <div className="flex-1 ml-4">
            <h3 className="text-[16px] font-bold pb-2">评论区</h3>
            <Search placeholder="请输入您想查询该帖子评论的Id(默认获取所有)" onSearch={debounceGetComments} style={{ width: 345,paddingBottom:4 }} />
            <div
                id="scrollableDiv"
                style={{
                    height:500,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
                >
                <InfiniteScroll
                    dataLength={data.length}
                    next={debounceGetComments}
                    hasMore={data.length < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>已经到底了...</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.commentId}>
                        <List.Item.Meta
                            avatar={<Avatar src="../../../assets/csustplant.png" />}
                            title={<a>{item.commentId}</a>}
                            description={item.parentCommentId === null ? item.content : `回复 @${item.parentCommentId}` +" :"+ item.content}
                        />
                        <div className="mr-4">{item.createTime}</div>
                        <div className="hover:cursor-pointer active:text-blue-300" onClick={showModal}>查看详情</div>
                        <div className="ml-4 hover:cursor-pointer active:text-red-500" onClick={deleteComment}>删除</div>
                        </List.Item>
                    )}
                    />
                </InfiniteScroll>
            </div>
        </div>
        <Modal  open={isModalOpen} onOk={closeModal} onCancel={closeModal} className='overflow-hidden'>
            <div className='flex flex-col h-96 w-[490px] mt-8 overflow-hidden'>
                <ul className='p-4 overflow-y-scroll border-l-sky-100 bg-slate-100 w-[458px] h-88 rounded-xl whitespace-pre-wrap'>
                    {Object.entries(modalData).map(([key, value]:CommentsProps[], index)=>{
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