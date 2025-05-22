import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserInfoResponse } from "@/types/user";

interface UserStatsProps {
  userStatsResp: UserInfoResponse["data"]["userStatsResp"];
}

export const UserStats = ({ userStatsResp }: UserStatsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">统计数据</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>指标</TableHead>
            <TableHead>数值</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">学号</TableCell>
            <TableCell>{userStatsResp.studentNumber || "未设置"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">文章数</TableCell>
            <TableCell>{userStatsResp.articleCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">评论数</TableCell>
            <TableCell>{userStatsResp.commentCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">声明数</TableCell>
            <TableCell>{userStatsResp.statementCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">获赞数</TableCell>
            <TableCell>{userStatsResp.likedCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">硬币</TableCell>
            <TableCell>{userStatsResp.coinCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">经验值</TableCell>
            <TableCell>{userStatsResp.xp}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">考核通过状态</TableCell>
            <TableCell>{userStatsResp.quizType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">统计数据创建时间</TableCell>
            <TableCell>
              {new Date(userStatsResp.createTime).toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">统计数据更新时间</TableCell>
            <TableCell>
              {new Date(userStatsResp.updateTime).toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">统计数据描述</TableCell>
            <TableCell>{userStatsResp.description || "无"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
