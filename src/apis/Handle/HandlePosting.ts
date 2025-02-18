//帖子管理
import AxiosRequest from '@/utils/requests'

export const getPostingLists = (pageNumber:number,pageSize:number)=>{
    return AxiosRequest.get(`/web/posts?page=${pageNumber}&limit=${pageSize}`)
}

export const getPostingProfiles = (post_id:string)=>{
    return AxiosRequest.get(`/web/posts/${post_id}`)
}

export const delViolatingPosting = (post_id:string | number)=>{
    return AxiosRequest.del(`/web/posts/${post_id}`)
}

export const getReportedPostingProfiles = (pageNumber:number,pageSize:number)=>{
    return AxiosRequest.get(`/web/posts/reported?page=${pageNumber}&limit=${pageSize}`)
}

export const reviewReportedPosting = (post_id:string,action:number,reason:string)=>{
    return AxiosRequest.put(`/web/posts/${post_id}/review`,{
        action,
        reason
    })
}

export const getPostingAllComments = (post_id:string,pageNumber:number,pageSize:number)=>{
    return AxiosRequest.get(`/web/posts/${post_id}/comments?page=${pageNumber}&limit=${pageSize}`)
}

export const searchComment = (post_id:string,pageNumber:number,pageSize:number,keyword:string)=>{
    return AxiosRequest.get(`/web/posts/${post_id}/comments/search?page=${pageNumber}&limit=${pageSize}&keyword=${keyword}`)
}

export const delComment = (post_id:number,comment_id:number)=>{
    return AxiosRequest.del(`/web/posts/${post_id}/comments/${comment_id}`)
}