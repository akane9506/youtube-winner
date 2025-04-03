import { Comment } from "@/models";
import { Avatar } from "@heroui/avatar";

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex items-center my-2 px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/20 shadow-md">
      <div className="flex items-center gap-4 mr-4 w-[200px]">
        <Avatar src={comment.autherProfileImageUrl} alt={comment.autherDisplayName} />
        <div>
          <a href={comment.autherChannelUrl} target="_blank">
            {comment.autherDisplayName}
          </a>
          <p className="text-xs">
            {new Date(comment.createdAt).toLocaleString().split(",")[0]}
          </p>
        </div>
      </div>
      <p className="text-sm flex-1">
        {comment.textDisplay.length >= 100
          ? comment.textDisplay.slice(0, 100) + "..."
          : comment.textDisplay}
      </p>
    </div>
  );
};

export default CommentItem;
