import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommentResp } from "@/types/post";
import { Clock, Trash2, User } from "lucide-react";
import { useState } from "react";

interface CommentItemProps {
  comment: CommentResp;
  replies: CommentResp[];
  onDeleteComment: (commentId: number) => Promise<void>;
}

export const CommentItem = ({
  comment,
  replies,
  onDeleteComment,
}: CommentItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDeleteComment(comment.commentId);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 mr-2 text-muted-foreground" />
              用户 {comment.userId}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(comment.createTime).toLocaleString()}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label="删除评论"
          >
            {isDeleting ? (
              "删除中..."
            ) : (
              <Trash2 className="h-4 w-4 text-red-500" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm">{comment.content}</p>
        {comment.description && (
          <p className="text-xs text-muted-foreground mt-1">
            备注: {comment.description}
          </p>
        )}
      </CardContent>

      {replies && replies.length > 0 && (
        <CardFooter className="flex-col items-start gap-3 pt-3 pl-10 border-t">
          {replies.map((reply) => (
            <div key={reply.commentId} className="text-sm w-full">
              <div className="flex justify-between items-start">
                <p className="font-semibold flex items-center">
                  <User className="h-4 w-4 mr-1 text-muted-foreground" />
                  用户 {reply.userId}
                  <span className="text-xs text-muted-foreground ml-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(reply.createTime).toLocaleString()}
                  </span>
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={async () => {
                    await onDeleteComment(reply.commentId);
                  }}
                  disabled={isDeleting}
                  className="h-6 w-6"
                  aria-label="删除回复"
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
              </div>
              <p className="ml-5 mt-1">{reply.content}</p>
            </div>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};
