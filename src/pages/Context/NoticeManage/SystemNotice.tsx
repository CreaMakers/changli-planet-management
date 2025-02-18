import {sendSystemNotice} from '@/apis/Handle/index'
import {SystemNoticeProps} from '@/utils/ModuleProps/SendNotice'
import {useState} from 'react'
import { Descriptions,Button } from 'antd';
import type { DescriptionsProps, } from 'antd';


export default function SendSystemNotice(){

    const [noticeItem,setNoticeItem] = useState<SystemNoticeProps>({})

    const items: DescriptionsProps['items'] = [
        {
            label: '接收者Id',
            span: 1,
            children: <input type="text" className='block w-full border-none outline-none' placeholder="输入接收者id" autoFocus onChange={(e)=>setNoticeItem({
                ...noticeItem,
                receiverId:parseInt(e.target.value)
            })}/>,
        },
        {
            label: '概述',
            span: 1,
            children: <input type="text" className='block w-full border-none outline-none' placeholder="简述通知内容" autoFocus onChange={(e)=>setNoticeItem({
                ...noticeItem,
                description:e.target.value
            })}/>,
        },
        {
            label: '通知内容',
            span: 2,
            children: <textarea  className='block w-full h-48 border-none outline-none' placeholder="通知详情" autoFocus onChange={(e)=>setNoticeItem({
                ...noticeItem,
                content:e.target.value
            })}/>,
        }, 
    ];

    const sendNotice = async ()=>{
        const res = await sendSystemNotice(noticeItem)
        console.log(res);
        
    }
    return (
    <>
        <div className="flex h-full overflow-hidden">
                <div className="w-full h-full">
                    <div className="w-auto h-full overflow-auto">
                        <Descriptions
                            title="处理举报"
                            extra={
                                <>
                                  <Button type="primary" onClick={sendNotice} style={{marginLeft:5}}>提交处理</Button>
                                </>
                            }
                            bordered
                            size="small"
                            column={2}
                            items={items}
                        />
                    </div>
                </div>
            </div>
    </>)
}