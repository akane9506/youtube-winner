import { useContext, useMemo, useState, useEffect } from "react";
import { Tabs, Tab } from "@heroui/react";
import { CONTENTS } from "@/consts";
import { User } from "@/models";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import CommentFilters from "@/components/routes/results/CommentFilters";
import Users from "@/components/routes/results/Users";
import Comments from "@/components/routes/results/Comments";

const DELAY = 500;

const Results = () => {
  const { language } = useContext(PreferenceContext);
  const { searchResults, updateUserPool } = useContext(SearchResultContext);

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

  // Filter the comments based on the date range and keywords
  const [filteredResults, filteredUsers] = useMemo(() => {
    const userSet = new Set<string>();
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

  // Update the user pool in the context
  useEffect(() => {
    updateUserPool(filteredUsers);
  }, [updateUserPool, filteredUsers]);

  return (
    <div className="flex-1 w-full py-4 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-auto max-h-full max-w-[1800px] mx-auto">
      <CommentFilters
        min={minTime}
        max={maxTime}
        updateDateRange={handleUpdateDateRange}
        excludeDuplicates={excludeDuplicates}
        toggleExcludeDuplicates={handleToggleExcludeDuplicates}
        updateKeywords={debounceUpdateKeywords}
      />
      <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col items-center overflow-y-auto">
        <Tabs
          classNames={{ panel: "flex-1 flex h-[80%] w-full" }}
          size="md"
          radius="full"
        >
          <Tab
            key="comments"
            title={`${CONTENTS.tab[language][0]} ${filteredResults.length}`}
          >
            <Comments filteredResults={filteredResults} />
          </Tab>
          <Tab key="users" title={`${CONTENTS.tab[language][1]} ${filteredUsers.length}`}>
            <Users filteredUsers={filteredUsers} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Results;
