import AxiosRequest from '@/utils/requests/index'
//文件系统api

export const getAllDocuments = (page:number,pageSize:number,fileType:number)=>{
    return AxiosRequest.get(`/web/files?page=${page}&pageSize=${pageSize}&fileType=${fileType}`)
}

export const delDocument = (fileId:number)=>{
    return AxiosRequest.del(`/web/files/${fileId}`)
}