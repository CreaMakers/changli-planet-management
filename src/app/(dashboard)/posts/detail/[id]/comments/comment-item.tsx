import { Badge } from "@/components/ui/badge";
import { CommentResp } from "@/types/post";

interface CommentItemProps {
  comment: CommentResp;
  replies?: CommentResp[];
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return dateString;
  }
}

export const CommentItem = ({ comment, replies = [] }: CommentItemProps) => {
  return (
    <div className="border-b pb-4 last:border-0">
      <div className="flex items-start">
        <div className="bg-muted text-primary rounded-full w-10 h-10 flex items-center justify-center font-bold">
          {comment.userId.toString().slice(0, 2)}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <div className="font-medium">用户 ID: {comment.userId}</div>
            <div className="text-sm text-muted-foreground">
              {formatDate(comment.createTime)}
            </div>
          </div>

          <div className="mt-2">
            <p className="text-sm">{comment.content}</p>
            {comment.isDeleted && (
              <Badge variant="outline" className="mt-1 text-muted-foreground">
                已删除
              </Badge>
            )}
          </div>
        </div>
      </div>

      {replies.length > 0 && (
        <div className="ml-12 mt-4 space-y-4 border-l-2 pl-4">
          {replies.map((reply) => (
            <div key={reply.commentId} className="pb-2">
              <div className="flex items-start">
                <div className="bg-muted text-primary rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                  {reply.userId.toString().slice(0, 2)}
                </div>
                <div className="ml-2 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">
                      用户 ID: {reply.userId}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(reply.createTime)}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm">{reply.content}</p>
                    {reply.isDeleted && (
                      <Badge
                        variant="outline"
                        className="mt-1 text-xs text-muted-foreground"
                      >
                        已删除
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
