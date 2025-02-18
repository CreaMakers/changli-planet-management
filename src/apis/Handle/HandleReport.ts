import AxiosRequest from '@/utils/requests'
import {HandleReportProps,PunishUserDataProps} from '@/utils/ModuleProps/ReportItemProps'
//举报系统api


export const getAllReports = ()=>{
    return AxiosRequest.get(`/web/reports/users`)
}

export const handleUserReport = (reportId:number,data:HandleReportProps)=>{
    return AxiosRequest.put(`/web/reports/posts/${reportId}`,data)
}

export const punishUser = (data:PunishUserDataProps)=>{
    return AxiosRequest.post(`/web/reports/user/penalties`,data)
}