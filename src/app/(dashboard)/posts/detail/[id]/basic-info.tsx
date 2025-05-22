import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PostResp } from "@/types/post";

interface PostBasicInfoProps {
  post: PostResp;
}

export const PostBasicInfo = ({ post }: PostBasicInfoProps) => {
  const categoryMap: Record<number, string> = {
    0: "普通",
    1: "教程",
    2: "文章",
    3: "经验分享",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">基本信息</h3>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">标题</TableCell>
              <TableCell>{post.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">群组ID</TableCell>
              <TableCell>{post.groupId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">发布用户ID</TableCell>
              <TableCell>{post.userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">类别</TableCell>
              <TableCell>{categoryMap[post.category] || "未知类型"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">是否加精</TableCell>
              <TableCell>{post.isPinned ? "是" : "否"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">浏览数</TableCell>
              <TableCell>{post.viewCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">投币数</TableCell>
              <TableCell>{post.coinCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">创建时间</TableCell>
              <TableCell>
                {new Date(post.createTime).toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">更新时间</TableCell>
              <TableCell>
                {new Date(post.updateTime).toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">状态</TableCell>
              <TableCell>{post.isDeleted ? "已删除" : "正常"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">描述</TableCell>
              <TableCell>{post.description || "无"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">帖子内容</h3>
        <Card>
          <CardContent className="whitespace-pre-wrap">
            {post.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
