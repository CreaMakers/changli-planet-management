import { BasicResponse } from "./response";

// 用户基本信息接口
export interface UserResp {
  userId: number;
  username: string;
  password: string;
  isAdmin: number;
  isDeleted: boolean;
  isBanned: boolean;
  createTime: string;
  updateTime: string;
  description: string;
}

// 用户配置文件接口
export interface UserProfileResp {
  userId: number;
  avatarUrl: string;
  bio: string;
  userLevel: number;
  gender: number;
  grade: string;
  birthDate: string;
  location: string;
  website: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  description: string;
}

// 用户统计数据接口
export interface UserStatsResp {
  userId: number;
  studentNumber: string;
  articleCount: number;
  commentCount: number;
  statementCount: number;
  likedCount: number;
  coinCount: number;
  xp: number;
  quizType: number;
  lastLoginTime: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  description: string;
}

// 用户信息响应接口
export interface UserInfoResponse extends BasicResponse {
  data: {
    userResp: UserResp;
    userProfileResp: UserProfileResp;
    userStatsResp: UserStatsResp;
  };
}

// 用户登录响应接口
export interface UserLoginResponse extends BasicResponse {
  data: {
    access_token: string;
    expires_in: string;
  };
}
