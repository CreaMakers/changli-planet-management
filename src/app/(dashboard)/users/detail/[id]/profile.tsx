import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserInfoResponse } from "@/types/user";

interface UserProfileProps {
  userProfileResp: UserInfoResponse["data"]["userProfileResp"];
}

export const UserProfile = ({ userProfileResp }: UserProfileProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 mt-6">个人资料</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">用户等级</TableCell>
            <TableCell>{userProfileResp.userLevel}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">性别</TableCell>
            <TableCell>
              {userProfileResp.gender === 1
                ? "男"
                : userProfileResp.gender === 2
                ? "女"
                : "未知"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">年级</TableCell>
            <TableCell>{userProfileResp.grade || "未设置"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">出生日期</TableCell>
            <TableCell>
              {userProfileResp.birthDate
                ? new Date(userProfileResp.birthDate).toLocaleDateString()
                : "未设置"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">位置</TableCell>
            <TableCell>{userProfileResp.location || "未设置"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">个人网站</TableCell>
            <TableCell>
              {userProfileResp.website ? (
                <a
                  href={userProfileResp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {userProfileResp.website}
                </a>
              ) : (
                "未设置"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">资料更新时间</TableCell>
            <TableCell>
              {new Date(userProfileResp.updateTime).toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">资料描述</TableCell>
            <TableCell>{userProfileResp.description || "无"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
