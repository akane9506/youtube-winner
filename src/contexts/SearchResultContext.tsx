import React, { useState, createContext } from "react";
import { getComments, getVideoInfo } from "@/api/comments";
import { Comment, User, VideoInfo } from "@/models";

interface SearchResultProps {
  searchResults: Comment[];
  users: User[];
  videoInfo: VideoInfo | null;
  isLoading: boolean;
  error: string | null;
  startSearch: (videoId: string) => void;
  clearSearch: () => void;
  updateUserPool: (newUserPool: User[]) => void;
}

const SearchResultContext = createContext<SearchResultProps>({
  searchResults: [],
  users: [],
  videoInfo: null,
  isLoading: false,
  error: null,
  startSearch: () => {},
  clearSearch: () => {},
  updateUserPool: () => {},
});

const SearchResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchResults, setSearchResults] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // fetch comments from youtube with video id
  const fetchComments = async (videoId: string) => {
    try {
      setIsLoading(true);
      const commentsData = await getComments(videoId);
      if (!commentsData || commentsData.length === 0) {
        throw new Error("No comments found");
      }
      const videoInfoData = await getVideoInfo(videoId);
      if (!videoInfoData) {
        throw new Error("No video info found");
      }
      setVideoInfo(videoInfoData);
      setSearchResults(commentsData);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startSearch = (videoId: string) => {
    // TODO: convert following alerts into warning messages on the input field
    if (videoId.length < 11) {
      setError("Please enter a valid video id");
      return;
    }

    let requestId = undefined;

    // TODO: implement local search limit
    if (videoId.startsWith("https://")) {
      const params = new URL(videoId).searchParams;
      requestId = params.get("v");
      if (!requestId) {
        setError("Please enter a valid video id"); // this should notify user to check if &v= in the url
        return;
      }
    } else {
      requestId = videoId;
    }

    fetchComments(requestId);
  };

  const updateUserPool = (newUserPool: User[]) => {
    setUsers(newUserPool);
  };

  const clearSearch = () => {
    setSearchResults([]);
    setUsers([]);
  };

  return (
    <SearchResultContext.Provider
      value={{
        searchResults,
        users,
        videoInfo,
        error,
        isLoading,
        startSearch,
        updateUserPool,
        clearSearch,
      }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};

export { SearchResultContext };
export default SearchResultProvider;
