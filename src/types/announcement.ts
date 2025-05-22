import { BasicResponse } from "./response";

export interface AnnouncementResp {
  announcementId: number; // 公告ID
  groupId: number; // 所属群聊ID
  userId: number; // 发布用户ID
  title: string; // 公告标题
  content: string; // 公告内容
  isPinned: boolean; // 是否置顶公告: true-置顶, false-不置顶
  createTime: string; // 公告创建时间
  updateTime: string; // 公告更新时间
  isDeleted: boolean; // 是否删除: false-未删除, true-已删除
  description: string; // 公告描述
}

export interface AnnouncementResponse extends BasicResponse {
  data: AnnouncementResp;
}

export interface AnnouncementsResponse extends BasicResponse {
  data: AnnouncementResp[];
}
