import { createContext, useState } from "react";
import {
  THEME_KEY,
  LANGUAGE_KEY,
  DEFAULT_COMMENTS_PER_PAGE,
  COMMENTS_NUM_BOUNDS,
  AvailableThemesType,
  AvailableLanguagesType,
} from "@/consts";
interface PreferenceProps {
  theme: AvailableThemesType;
  language: AvailableLanguagesType;
  commentsPerPage: number;
  toggleTheme: () => void;
  updateLanguage: (newLanguage: PreferenceProps["language"]) => void;
  updateCommentsPerPage: (numComments: number) => void;
}

// Initialize context with default values
const PreferenceContext = createContext<PreferenceProps>({
  theme: "light",
  language: "en",
  commentsPerPage: 12,
  toggleTheme: () => {},
  updateLanguage: () => {},
  updateCommentsPerPage: () => {},
});

const PreferenceProvider = ({ children }: { children: React.ReactNode }) => {
  let curr_theme = localStorage.getItem(THEME_KEY);
  if (!curr_theme) {
    localStorage.setItem(THEME_KEY, "light");
    curr_theme = "light";
  }

  let curr_language = localStorage.getItem(LANGUAGE_KEY);
  if (!curr_language) {
    localStorage.setItem(LANGUAGE_KEY, "en");
    curr_language = "en";
  }

  const [theme, setTheme] = useState<PreferenceProps["theme"]>(
    curr_theme as PreferenceProps["theme"]
  );
  const [language, setLanguage] = useState<PreferenceProps["language"]>(
    curr_language as PreferenceProps["language"]
  );
  const [commentsPerPage, setCommentsPerPage] = useState<number>(
    DEFAULT_COMMENTS_PER_PAGE
  );

  const handleToggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem(THEME_KEY, newTheme);
      return newTheme;
    });
  };

  const handleUpdateLanguage = (newLanguage: PreferenceProps["language"]) => {
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
    setLanguage(newLanguage);
  };

  const handleCommentsPerPage = (numComments: number) => {
    const [lowerBound, upperBound] = COMMENTS_NUM_BOUNDS;
    const boundedNum = Math.max(lowerBound, Math.min(numComments, upperBound));
    setCommentsPerPage(boundedNum);
  };

  return (
    <PreferenceContext.Provider
      value={{
        theme,
        language,
        // later change this to a state
        commentsPerPage,
        toggleTheme: handleToggleTheme,
        updateLanguage: handleUpdateLanguage,
        updateCommentsPerPage: handleCommentsPerPage,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};

export { PreferenceContext };
export default PreferenceProvider;
