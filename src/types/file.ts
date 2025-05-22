import { BasicResponse } from "./response";

export interface FileResp {
  fileId: number;
  groupId: number;
  userId: number;
  fileName: string;
  fileSize: number;
  fileType: number; // 文件类型 1-图片, 2-文档, 3-视频, 4-音频, 5-其他
  fileUrl: string;
  createTime: string;
  updateTime: string;
  isDeleted: boolean;
  description: string;
}

export interface FilesResponse extends BasicResponse {
  data: FileResp[];
}
