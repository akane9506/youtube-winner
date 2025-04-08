import { useContext, useMemo, useState } from "react";
import { Tabs, Tab, Pagination } from "@heroui/react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { CONTENTS } from "@/consts";
import CommentItem from "@/components/routes/results/CommentItem";
import CommentFilters from "@/components/routes/results/CommentFilters";

const Comments = () => {
  const { language, commentsPerPage } = useContext(PreferenceContext);
  const { searchResults } = useContext(SearchResultContext);
  const [page, setPage] = useState<number>(1);

  const [minTime, maxTime] = useMemo(() => {
    const dates = searchResults.map((data) => data.createdAt);
    return [Math.min(...dates), Math.max(...dates)];
  }, [searchResults]);

  // this date range state should be initialized with the min and max time
  const [dateRange, setDateRange] = useState<number[]>([minTime, maxTime]);

  const handleUpdateDateRange = (newDateRange: number[]) => {
    setDateRange(newDateRange);
  };

  const filteredResults = useMemo(() => {
    return searchResults.filter((data) => {
      return data.createdAt >= dateRange[0] && data.createdAt <= dateRange[1];
    });
  }, [searchResults, dateRange]);

  return (
    <div className="flex-1 w-full py-4 grid grid-cols-5 overflow-auto max-h-full">
      <CommentFilters
        min={minTime}
        max={maxTime}
        updateDateRange={handleUpdateDateRange}
      />
      <div className="col-span-4 flex flex-col items-center overflow-y-auto">
        <Tabs classNames={{ panel: "flex-1 flex h-[80%]" }} size="md" radius="full">
          <Tab key="comments" title={CONTENTS.tab[language][0]}>
            <div className="flex flex-col gap-4 items-center">
              <div className="flex-1 overflow-y-auto px-5">
                {filteredResults
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
                total={Math.ceil(filteredResults.length / commentsPerPage)}
                onChange={setPage}
                variant="light"
                size="sm"
              />
            </div>
          </Tab>
          <Tab key="likes" title={CONTENTS.tab[language][1]}></Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Comments;
