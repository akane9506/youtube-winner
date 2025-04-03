import { useContext } from "react";
import { Tabs, Tab } from "@heroui/react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import CommentItem from "./CommentItem";

const Results = () => {
  const { searchResults } = useContext(SearchResultContext);
  return (
    <div className="flex-1 w-full flex flex-col items-center px-40 max-h-full overflow-y-auto">
      <Tabs classNames={{ panel: "flex-1 flex flex-col h-[80%]" }}>
        <Tab key="comments" title="Comments">
          <div className="flex flex-col max-h-full">
            <div className="flex-1 overflow-y-auto">
              {searchResults.map((comment) => (
                <CommentItem
                  key={comment.autherDisplayName + comment.createdAt}
                  comment={comment}
                />
              ))}
            </div>
            <div className="h-32 text-center">pages</div>
          </div>
        </Tab>
        <Tab key="likes" title="Likes"></Tab>
      </Tabs>
    </div>
  );
};

export default Results;
