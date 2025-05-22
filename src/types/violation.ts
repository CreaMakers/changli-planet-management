import { BasicResponse } from "./response";

export interface ViolationResp {
  id: number; // 主键ID
  userId: number; // 违规用户ID
  violationType: number; // 违规类型: 1-言论违规，2-行为违规，3-其他
  penaltyType: number; // 处罚类型: 0-无，1-警告，2-封禁，3-禁言
  penaltyStatus: number; // 处罚状态: 0-未处罚, 1-处罚中, 2-处罚完成
  violationTime: string; // 违规时间
  penaltyTime: string | null; // 处罚时间
  muteDuration: number | null; // 禁言持续时间（分钟）
  banDuration: number | null; // 封禁持续时间（分钟）
  penaltyReason: string | null; // 处罚原因
  createTime: string; // 记录创建时间
  updateTime: string; // 记录更新时间
  isDeleted: number; // 是否删除: 0-未删除，1-已删除
  description: string; // 违规行为描述
}

export interface ViolationResponse extends BasicResponse {
  data: ViolationResp;
}

export interface ViolationsResponse extends BasicResponse {
  data: ViolationResp[];
}
