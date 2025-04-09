import { useContext, useMemo, useState, useEffect } from "react";
import { Tabs, Tab, Pagination } from "@heroui/react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { CONTENTS } from "@/consts";
import CommentItem from "@/components/routes/results/CommentItem";
import CommentFilters from "@/components/routes/results/CommentFilters";
import UserAvatar from "./UserAvatar";
import { User } from "@/models";

const DELAY = 500;

const Comments = () => {
  const { language, commentsPerPage } = useContext(PreferenceContext);
  const { searchResults, updateUserPool } = useContext(SearchResultContext);
  const [page, setPage] = useState<number>(1);

  const [minTime, maxTime] = useMemo(() => {
    const dates = searchResults.map((data) => data.createdAt);
    return [Math.min(...dates), Math.max(...dates)];
  }, [searchResults]);

  // Filters
  // this date range state should be initialized with the min and max time
  const [dateRange, setDateRange] = useState<number[]>([minTime, maxTime]);
  const [keywords, setKeywords] = useState<string>("");
  const [excludeDuplicates, setExcludeDuplicates] = useState<boolean>(true);

  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounceUpdateKeywords = (value: string) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setKeywords(value);
    }, DELAY);
  };

  const handleUpdateDateRange = (newDateRange: number[]) => {
    setDateRange(newDateRange);
  };
  const handleToggleExcludeDuplicates = (newValue: boolean) => {
    setExcludeDuplicates(newValue);
  };

  const [filteredResults, filteredUsers] = useMemo(() => {
    const userSet = new Set<string>();
    // reset the page to 1 when the filters change
    setPage(1);

    // filter out the comments based on the date range and keywords
    const filteredComments = searchResults.filter((data) => {
      if (userSet.has(data.autherDisplayName) && excludeDuplicates) {
        return false;
      }
      if (keywords.length > 0 && !data.textDisplay.includes(keywords)) {
        return false;
      }
      userSet.add(data.autherDisplayName);
      return data.createdAt >= dateRange[0] && data.createdAt <= dateRange[1];
    });

    // filter out the users based on the filtered comments
    const filteredUsers = filteredComments.map((comment) => {
      return new User(
        comment.autherDisplayName,
        comment.autherProfileImageUrl,
        comment.autherChannelUrl
      );
    });
    return [filteredComments, filteredUsers];
  }, [searchResults, keywords, dateRange, excludeDuplicates]);

  const totalPages = Math.ceil(filteredResults.length / commentsPerPage);

  useEffect(() => {
    updateUserPool(filteredUsers);
  }, [updateUserPool, filteredUsers]);

  return (
    <div className="flex-1 w-full py-4 grid grid-cols-5 overflow-auto max-h-full max-w-[1800px] mx-auto">
      <CommentFilters
        min={minTime}
        max={maxTime}
        updateDateRange={handleUpdateDateRange}
        excludeDuplicates={excludeDuplicates}
        toggleExcludeDuplicates={handleToggleExcludeDuplicates}
        updateKeywords={debounceUpdateKeywords}
      />
      <div className="col-span-4 flex flex-col items-center overflow-y-auto">
        <Tabs
          classNames={{ panel: "flex-1 flex h-[80%] w-full" }}
          size="md"
          radius="full"
        >
          <Tab
            key="comments"
            title={`${CONTENTS.tab[language][0]} ${filteredResults.length}`}
          >
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
              {totalPages > 0 && (
                <Pagination
                  color="secondary"
                  page={page}
                  total={totalPages}
                  onChange={setPage}
                  variant="light"
                  size="sm"
                />
              )}
            </div>
          </Tab>
          <Tab key="users" title={`${CONTENTS.tab[language][1]} ${filteredUsers.length}`}>
            <div className="grid grid-cols-6 gap-y-6 overflow-y-auto mx-auto px-10 py-4">
              {filteredUsers.map((user) => (
                <UserAvatar key={user.displayName} user={user} />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Comments;
