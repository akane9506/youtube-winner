import { useContext } from "react";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import Search from "@/components/routes/Search";
import Results from "@/components/routes/results/Results";

// The Main component functions as a router
const Main = () => {
  const { searchResults } = useContext(SearchResultContext);
  if (searchResults.length === 0) {
    return <Search />;
  }
  return <Results />;
};

export default Main;
