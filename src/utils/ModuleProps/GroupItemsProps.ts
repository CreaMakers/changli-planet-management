//获取群聊信息列表
export interface GroupListsProps{
    groupId:number,
    groupName:string,
    memberCount: number,
    memberLimit: number,
    type: number,
    requiresApproval: number,
    isDeleted: number,
    isBanned: number,
    avatarUrl: string,
    backgroundUrl: string,
    updateTime: string,
    createTime: string,
    description: string
}