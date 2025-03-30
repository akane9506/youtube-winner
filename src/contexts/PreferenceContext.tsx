import { createContext, useState } from "react";
import {
  THEME_KEY,
  LANGUAGE_KEY,
  AvailableThemesType,
  AvailableLanguagesType,
} from "@/consts";
interface PreferenceProps {
  theme: AvailableThemesType;
  language: AvailableLanguagesType;
  toggleTheme: () => void;
  updateLanguage: (newLanguage: PreferenceProps["language"]) => void;
}

// Initialize context with default values
const PreferenceContext = createContext<PreferenceProps>({
  theme: "light",
  language: "en",
  toggleTheme: () => {},
  updateLanguage: () => {},
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

  return (
    <PreferenceContext.Provider
      value={{
        theme,
        language,
        toggleTheme: handleToggleTheme,
        updateLanguage: handleUpdateLanguage,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};

export { PreferenceContext };
export default PreferenceProvider;
