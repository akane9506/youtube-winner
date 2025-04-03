import { useContext } from "react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import CommentItem from "./CommentItem";

const Results = () => {
  const { searchResults } = useContext(SearchResultContext);
  return (
    <div className="w-full flex flex-col items-center justify-center px-40">
      <div>
        {searchResults.map((comment) => (
          <CommentItem
            key={comment.autherDisplayName + comment.createdAt}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};

export default Results;
