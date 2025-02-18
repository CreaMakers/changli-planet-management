import AxiosRequest from '@/utils/requests/index'

interface updatedDataProps {
    title: string,
    content: string,
    isPinned: boolean,
    description: string
}
//公告系统api
export const getAllAnnouncementList = (page:number,pageize:number)=>{
    return AxiosRequest.get(`/web/announcements?page=${page}&limit=${pageize}`)
}

export const getAnnouncementDetails = (announcement_id:string)=>{
    return AxiosRequest.get(`/web/announcements/${announcement_id}`)
}

export const editCurrentAnnouncement = (announcement_id:string,updatedData:updatedDataProps)=>{
    return AxiosRequest.put(`/web/announcements/${announcement_id}`,updatedData)
}

export const delAnnouncement = (announcement_id:string)=>{
    return AxiosRequest.del(`/web/announcements/${announcement_id}`)
}