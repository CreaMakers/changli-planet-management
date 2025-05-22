import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserInfoResponse } from "@/types/user";

interface UserBasicInfoProps {
  userResp: UserInfoResponse["data"]["userResp"];
  userProfileResp: UserInfoResponse["data"]["userProfileResp"];
  userStatsResp: UserInfoResponse["data"]["userStatsResp"];
}

export const UserBasicInfo = ({
  userResp,
  userProfileResp,
  userStatsResp,
}: UserBasicInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src={userProfileResp.avatarUrl} />
          <AvatarFallback>{userResp.username[0]}</AvatarFallback>
        </Avatar>
        <div className="text-xl font-semibold">{userResp.username}</div>
        <div className="text-muted-foreground">
          {userProfileResp.bio || "暂无简介"}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">基本信息</h3>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">用户名</TableCell>
              <TableCell>{userResp.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">注册时间</TableCell>
              <TableCell>
                {new Date(userResp.createTime).toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">更新时间</TableCell>
              <TableCell>
                {new Date(userResp.updateTime).toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">最后登录</TableCell>
              <TableCell>
                {userStatsResp.lastLoginTime
                  ? new Date(userStatsResp.lastLoginTime).toLocaleString()
                  : "未知"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">用户描述</TableCell>
              <TableCell>{userResp.description || "无"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">管理员</TableCell>
              <TableCell>{userResp.isAdmin === 1 ? "是" : "否"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">账号状态</TableCell>
              <TableCell>
                {userResp.isDeleted
                  ? "已删除"
                  : userResp.isBanned
                  ? "已封禁"
                  : "正常"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
