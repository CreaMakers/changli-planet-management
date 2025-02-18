export interface DocumentsProps {
    fileId: number,
    groupId: number,
    userId: number,
    fileName: string,
    fileSize: number,
    fileType: number,
    fileUrl: string,
    createTime: string,
    updateTime: string,
    isDeleted: boolean,
    description: string
}