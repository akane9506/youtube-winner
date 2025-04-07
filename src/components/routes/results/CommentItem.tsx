import { Comment } from "@/models";
import { Avatar } from "@heroui/avatar";

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex items-center my-3 px-4 py-2 rounded-lg shadow-md w-[1000px] border border-default-foreground/10">
      <div className="flex items-center gap-4 mr-4 w-[260px]">
        <Avatar
          className="w-10 h-10"
          src={comment.autherProfileImageUrl}
          alt={comment.autherDisplayName}
          name={comment.autherDisplayName}
          fallback="initials"
        />
        <div>
          <a
            href={comment.autherChannelUrl}
            target="_blank"
            className="text-sm font-semibold"
          >
            {comment.autherDisplayName}
          </a>
          <p className="text-xs opacity-60">
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
