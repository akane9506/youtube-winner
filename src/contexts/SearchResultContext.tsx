import { useState, createContext } from "react";
import { getComments } from "@/api/comments";
import { Comment } from "@/models";

interface SearchResultProps {
  searchResults: Comment[];
  isLoading: boolean;
  error: string | null;
  startSearch: (videoId: string) => void;
}

const SearchResultContext = createContext<SearchResultProps>({
  searchResults: [],
  isLoading: false,
  error: null,
  startSearch: () => {},
});

const SearchResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchResults, setSearchResults] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // fetch comments from youtube with video id
  const fetchComments = async (videoId: string) => {
    try {
      setIsLoading(true);
      const data = await getComments(videoId);
      if (!data || data.length === 0) {
        throw new Error("No comments found");
      }
      setSearchResults(data);
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

  return (
    <SearchResultContext.Provider
      value={{ searchResults, error, isLoading, startSearch }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};

export { SearchResultContext };
export default SearchResultProvider;
