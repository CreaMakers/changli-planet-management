//帖子系统

//帖子详情
export interface PostingListsProps {
    postId: number,
    groupId: number,
    userId: number,
    title: string,
    content: any,
    category: number,
    isPinned: boolean,
    viewCount: number,
    coinCount: number,
    createTime: string,
    updateTime: string,
    isDeleted: boolean,
    description: string
}

//评论详情
export interface CommentsProps {
    postId: number,
    commentId: number,
    userId: number,
    parentCommentId: null | number,
    content: any,
    createTime: string,
    updateTime: string,
    isDeleted: boolean,
    description: string
}

//帖子举报列表信息
export interface ReportedPostingProps {
    reportId: number,
    postId: number,
    reporterId: number,
    reason: string,
    reportTime: string,
    status: number,
    processDescription: null | string,
    isDeleted: boolean,
    createTime: string,
    updateTime: string,
    description: string
}