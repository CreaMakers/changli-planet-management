import { BasicResponse } from "./response";

// 用户基本信息接口，对应 user 表
export interface UserResp {
  userId: number; // 用户ID
  username: string; // 用户名
  password: string; // 密码(已加密)
  isAdmin: number; // 管理员权限: 0-普通用户, 1-运营组，2-开发组
  isDeleted: boolean; // 是否删除: 0-未删除, 1-已删除
  isBanned: boolean; // 是否被封禁: 0-未封禁, 1-已封禁
  createTime: string; // 创建时间
  updateTime: string; // 最后更新时间
  description: string; // 用户描述
}

// 用户配置文件接口，对应 user_profile 表
export interface UserProfileResp {
  userId: number; // 用户ID
  avatarUrl: string; // 用户头像URL
  bio: string; // 个性标签/个人描述
  userLevel: number; // 用户等级
  gender: number; // 性别: 0-男, 1-女, 2-其他
  grade: string; // 年级
  birthDate: string; // 出生日期
  location: string; // 所在地
  website: string; // 个人网站或社交链接
  createTime: string; // 记录创建时间
  updateTime: string; // 记录更新时间
  isDeleted: number; // 是否删除: 0-未删除，1-已删除
  description: string; // 用户展示信息描述
}

// 用户统计数据接口，对应 user_stats 表
export interface UserStatsResp {
  userId: number; // 用户ID
  studentNumber: string; // 学号，唯一
  articleCount: number; // 发表文章数
  commentCount: number; // 评论次数
  statementCount: number; // 发言次数
  likedCount: number; // 收到点赞次数
  coinCount: number; // 硬币数量
  xp: number; // 经验值
  quizType: number; // 考核通过状态
  lastLoginTime: string; // 最近登录时间
  createTime: string; // 记录创建时间
  updateTime: string; // 记录更新时间
  isDeleted: number; // 是否删除: 0-未删除，1-已删除
  description: string; // 用户动态数据描述
}

// 用户信息响应接口，包含用户的基本信息、配置文件和统计数据
export interface UserInfoResponse extends BasicResponse {
  data: {
    userResp: UserResp; // 用户基本信息
    userProfileResp: UserProfileResp; // 用户配置文件信息
    userStatsResp: UserStatsResp; // 用户统计数据信息
  };
}

// 用户登录响应接口，包含访问令牌和过期时间
export interface UserLoginResponse extends BasicResponse {
  data: {
    access_token: string; // 访问令牌
    expires_in: string; // 令牌过期时间
  };
}

// 用户数量响应接口
export interface UsersCountResponse extends BasicResponse {
  data: number; // 用户总数
}

// 多用户信息响应接口，包含多个用户的完整信息
export interface UsersInfoResponse extends BasicResponse {
  data: {
    userResp: UserResp; // 用户基本信息
    userProfileResp: UserProfileResp; // 用户配置文件信息
    userStatsResp: UserStatsResp; // 用户统计数据信息
  }[];
}
