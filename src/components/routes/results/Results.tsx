import { useContext, useState } from "react";
import { Tabs, Tab, Pagination } from "@heroui/react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { CONTENTS } from "@/consts";
import CommentItem from "./CommentItem";

const Results = () => {
  const { language, commentsPerPage } = useContext(PreferenceContext);
  const { searchResults } = useContext(SearchResultContext);
  const [page, setPage] = useState<number>(1);
  return (
    <div className="flex-1 w-full py-4 flex flex-col items-center px-40 max-h-full overflow-y-auto">
      <Tabs classNames={{ panel: "flex-1 flex h-[80%]" }} size="md" radius="full">
        <Tab key="comments" title={CONTENTS.tab[language][0]}>
          <div className="flex flex-col gap-4 max-h-full items-center">
            <div className="flex-1 overflow-y-auto px-5">
              {searchResults
                .slice((page - 1) * commentsPerPage, page * commentsPerPage)
                .map((comment) => (
                  <CommentItem
                    key={comment.autherDisplayName + comment.createdAt}
                    comment={comment}
                  />
                ))}
            </div>
            <Pagination
              color="secondary"
              page={page}
              total={Math.ceil(searchResults.length / commentsPerPage)}
              onChange={setPage}
              variant="light"
              size="sm"
            />
          </div>
        </Tab>
        <Tab key="likes" title={CONTENTS.tab[language][1]}></Tab>
      </Tabs>
    </div>
  );
};

export default Results;
