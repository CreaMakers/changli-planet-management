import { BasicResponse } from "./response";

export interface PostResp {
  postId: number; // 帖子ID
  groupId: number; // 所属群聊ID
  userId: number; // 发布用户ID
  title: string; // 帖子标题
  content: string; // 帖子内容
  category: number; // 帖子类别: 0-general, 1-tutorial, 2-article, 3-experience
  isPinned: boolean; // 是否加精: false-否, true-是
  viewCount: number; // 浏览人数
  coinCount: number; // 被投币量
  createTime: string; // 帖子创建时间
  updateTime: string; // 帖子更新时间
  isDeleted: boolean; // 是否删除: false-未删除, true-已删除
  description: string; // 帖子描述
}

export interface PostsResponse extends BasicResponse {
  data: PostResp[];
}

export interface PostResponse extends BasicResponse {
  data: PostResp;
}

// 添加评论相关接口
export interface CommentResp {
  commentId: number; // 评论ID
  postId: number; // 帖子ID
  userId: number; // 发布用户ID
  parentCommentId: number | null; // 父评论ID，如果是一级评论则为null
  content: string; // 评论内容
  createTime: string; // 评论创建时间
  updateTime: string; // 评论更新时间
  isDeleted: boolean; // 是否删除: false-未删除, true-已删除
  description: string; // 评论描述
}

export interface CommentsResponse extends BasicResponse {
  data: CommentResp[];
}
