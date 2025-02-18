import AxiosRequest from '@/utils/requests/index'
//群聊管理api


//开发组特权
export const privilegeCreateGroup = ()=>{
    return AxiosRequest.post('/web/admin/groups')
}

export const privilegeDelGroup = (groupId:string)=>{
    return AxiosRequest.del(`/web/admin/groups/${groupId}`)
}

export const privilegeAddGroupLeader = (groupId:string)=>{
    return AxiosRequest.post(`/web/admin/groups/${groupId}/owners`)
}
export const privilegeChangeGroupLeader = (groupId:string)=>{
    return AxiosRequest.put(`/web/admin/groups/${groupId}/owners`)
}

export const privilegeLockMessage = (groupId:string)=>{
    return AxiosRequest.put(`/web/admin/groups/${groupId}/lock`)
}
export const privilegeMuteMessage = (groupId:string)=>{
    return AxiosRequest.put(`/web/admin/groups/${groupId}/mute`)
}

//常规
export const getAllGroupsProfiles = (page:number,pageSize:number)=>{
    return AxiosRequest.get(`/web/groups?page=${page}&pageSize=${pageSize}`)
}

export const changeGroupMessages = (groupId:string)=>{
    return AxiosRequest.put(`/web/groups/${groupId}`)
}

export const addGroupAdministrator = (groupId:string)=>{
    return AxiosRequest.put(`/web/groups/${groupId}/administrators`)
}

export const getGroupMembers = (groupId:string)=>{
    return AxiosRequest.get(`/web/groups/${groupId}/members`)
}

export const delGroupAdministrator  = (groupId:string,adminId:string)=>{
    return AxiosRequest.get(`/web/groups/${groupId}/administrators/${adminId}`)
}

export const reviewGroupJoinApplication  = (groupId:string,applicationtId:string)=>{
    return AxiosRequest.get(`/web/groups/${groupId}/applications/${applicationtId}`)
}

