import {HandleReportProps} from '@/utils/ModuleProps/ReportItemProps.ts'
import {handleUserReport} from '@/apis/Handle/HandleReport.ts'
import { Descriptions,Button,Modal } from 'antd';
import type { DescriptionsProps, } from 'antd';
import { useParams,useLocation } from 'react-router-dom';
import {useState} from 'react'
import dayjs from 'dayjs';


export default function ReportDetil(){

    const location = useLocation();
    const { reportId } = useParams();
    const { reportedUserId,description} = location.state || false;
    const [reasultItem,setReasultItem] = useState<HandleReportProps>({
        reportId: reportId && parseInt(reportId),
        reportedUserId:reportedUserId,
        description: description,
        penaltyType:1,
        violationType:1
    })

    const items: DescriptionsProps['items'] = [
        {
            label: '报告Id',
            span: 1,
            children: reportId,
        },
        {
            label: '被举报者Id',
            span: 1,
            children: reportedUserId,
        },
        {
            label: '描述',
            span: 2,
            children: description,
        },
        {
            label: '惩罚类型',
            span: 1,
            children: 
            <>
            <select onChange={(e)=>setReasultItem({
                ...reasultItem,
                penaltyType:e.target.value
            })}>
                <option value={1}>禁言</option>
                <option value={2}>封号</option>
            </select>
            </>,
        },
        {
            label: '违规类型',
            span: 1,
            children: 
            <select onChange={(e)=>setReasultItem({
                ...reasultItem,
                violationType:e.target.value
            })}>
                <option value={1}>言论违规</option>
                <option value={2}>行为违规</option>
                <option value={3}>其他</option>
            </select>
            },
        {
            label: '惩罚描述',
            span: 1,
            children: <input type="text" className='block w-full border-none outline-none' placeholder="概述处理结果" autoFocus onChange={(e)=>setReasultItem({
                ...reasultItem,
                processDescription:e.target.value
            })}/>,
        },
        {
            label: '惩罚持续时间',
            span: 1,
            children: <><input type="number" className='block w-full border-none outline-none' placeholder="惩罚时间（单位为小时）" autoFocus onChange={(e)=>setReasultItem({
                ...reasultItem,
                punishmentDuration:parseInt(e.target.value)
            })}/></>,
        },
        {
            label: '惩罚原因',
            span: 2,
            style:{overflow:"auto"},
            children:<textarea className='block w-full border-none outline-none h-48' placeholder="描述一下惩罚原因" autoFocus onChange={(e)=>setReasultItem({
                ...reasultItem,
                penaltyReason:e.target.value
            })}/>,
        },
        
    ];


    const sendProcessingResult = async ()=>{
        let nowTime = dayjs().format('YYYY-MM-DDTHH:mm:ss') + 'Z'
        setReasultItem({
            ...reasultItem,
            violationTime:nowTime
        })
        const res = await handleUserReport(reportId,reasultItem)
        if(/^2\d{2}$/.test(res.data.code)){
            alert("处理成功")
        }else{
            console.log('查询出错',res.data.msg);
        }
        
    }
    return (
        <>
        <>
            <div className="flex h-full overflow-hidden">
                <div className="w-full h-full">
                    <div className="w-auto h-full overflow-auto">
                        <Descriptions
                            title="处理举报"
                            extra={
                                <>
                                  <Button type="primary" onClick={sendProcessingResult} style={{marginLeft:5}}>提交处理</Button>
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
        </>
        </>
    ) 
}