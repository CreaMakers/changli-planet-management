import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AnnouncementResp } from "@/types/announcement";

interface AnnouncementBasicInfoProps {
  announcement: AnnouncementResp;
}

export const AnnouncementBasicInfo = ({
  announcement,
}: AnnouncementBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">基本信息</h3>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">标题</TableCell>
              <TableCell>{announcement.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">群组ID</TableCell>
              <TableCell>{announcement.groupId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">发布用户ID</TableCell>
              <TableCell>{announcement.userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">是否置顶</TableCell>
              <TableCell>{announcement.isPinned ? "是" : "否"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">创建时间</TableCell>
              <TableCell>
                {new Date(announcement.createTime).toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">更新时间</TableCell>
              <TableCell>
                {new Date(announcement.updateTime).toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">状态</TableCell>
              <TableCell>
                {announcement.isDeleted ? "已删除" : "正常"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">描述</TableCell>
              <TableCell>{announcement.description || "无"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">公告内容</h3>
        <Card>
          <CardContent className="whitespace-pre-wrap">
            {announcement.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
