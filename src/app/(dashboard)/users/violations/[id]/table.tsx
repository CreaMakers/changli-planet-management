import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViolationResp } from "@/types/violation";

function formatDateTime(dateString: string): string {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDuration(minutes: number | null): string {
  if (!minutes) return "-";

  if (minutes < 60) {
    return `${minutes}分钟`;
  } else if (minutes < 24 * 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
  } else {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    return hours > 0 ? `${days}天${hours}小时` : `${days}天`;
  }
}

const violationTypeMap: Record<number, string> = {
  1: "言论违规",
  2: "行为违规",
  3: "其他",
};

const penaltyTypeMap: Record<number, string> = {
  0: "无处罚",
  1: "警告",
  2: "封禁",
  3: "禁言",
};

const penaltyStatusMap: Record<number, string> = {
  0: "未处罚",
  1: "处罚中",
  2: "处罚完成",
};

export function UserViolationsTable({
  violations,
}: {
  violations: ViolationResp[];
}) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>违规类型</TableHead>
            <TableHead>违规时间</TableHead>
            <TableHead>违规描述</TableHead>
            <TableHead>处罚类型</TableHead>
            <TableHead>处罚状态</TableHead>
            <TableHead>处罚时间</TableHead>
            <TableHead>禁言时长</TableHead>
            <TableHead>封禁时长</TableHead>
            <TableHead>处罚原因</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {violations.map((violation) => (
            <TableRow key={violation.id}>
              <TableCell>{violation.id}</TableCell>
              <TableCell>
                {violationTypeMap[violation.violationType] || "未知"}
              </TableCell>
              <TableCell>{formatDateTime(violation.violationTime)}</TableCell>
              <TableCell className="max-w-[200px] whitespace-normal break-words">
                {violation.description || "-"}
              </TableCell>
              <TableCell>
                {penaltyTypeMap[violation.penaltyType] || "未知"}
              </TableCell>
              <TableCell>
                {penaltyStatusMap[violation.penaltyStatus] || "未知"}
              </TableCell>
              <TableCell>
                {formatDateTime(violation.penaltyTime || "")}
              </TableCell>
              <TableCell>{formatDuration(violation.muteDuration)}</TableCell>
              <TableCell>{formatDuration(violation.banDuration)}</TableCell>
              <TableCell className="max-w-[200px] whitespace-normal break-words">
                {violation.penaltyReason || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
