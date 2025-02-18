import AxiosRequest from '@/utils/requests'
import {SystemNoticeProps} from '@/utils/ModuleProps/SendNotice'
//发送通知api

export const sendSystemNotice = (data:SystemNoticeProps)=>{
    return AxiosRequest.post(`/web/notifications/system`,data)
}