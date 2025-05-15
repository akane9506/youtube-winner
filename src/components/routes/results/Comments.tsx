import { useState, useContext, useEffect } from "react";
import { Pagination } from "@heroui/react";
import CommentItem from "@/components/routes/results/CommentItem";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { Comment } from "@/models";
import CommentNumDropdown from "./CommentNumDropdown";

const Comments = ({ filteredResults }: { filteredResults: Comment[] }) => {
  const { commentsPerPage } = useContext(PreferenceContext);
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredResults.length / commentsPerPage);

  // Reset page to 1 when filteredResults change
  useEffect(() => {
    setPage(1);
  }, [filteredResults]);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="flex-1 overflow-y-auto px-5 w-full">
        {filteredResults.length > 0 ? (
          filteredResults
            .slice((page - 1) * commentsPerPage, page * commentsPerPage)
            .map((comment) => (
              <CommentItem
                key={comment.autherDisplayName + comment.createdAt}
                comment={comment}
              />
            ))
        ) : (
          <p>No Comments Available</p>
        )}
      </div>
      <div className="grid grid-cols-3 justify-items-center">
        {totalPages > 0 && (
          <Pagination
            color="secondary"
            page={page}
            total={totalPages}
            onChange={setPage}
            variant="light"
            size="sm"
            className="col-start-2"
          />
        )}
        <CommentNumDropdown />
      </div>
    </div>
  );
};

export default Comments;
