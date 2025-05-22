import { useContext } from "react";
import headerIcon from "@/assets/webicon.png";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { SearchResultContext } from "@/contexts/SearchResultContext";
import { LANGUAGE_MENU, type AvailableLanguagesType } from "@/consts";
import {
  Button,
  Switch,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import githubIcon from "@/assets/github.png";
import githubIconWhite from "@/assets/github-white.png";

const Header = () => {
  const { theme, language, toggleTheme, updateLanguage } = useContext(PreferenceContext);
  const { clearSearch } = useContext(SearchResultContext);
  const languageDiplay = LANGUAGE_MENU.find((item) => item.key === language)?.text;
  return (
    <div className="flex items-center justify-between px-5 py-2 border-b-1 border-foreground/30">
      <div className="hover:cursor-pointer flex gap-2" onClick={clearSearch}>
        <img src={headerIcon} alt="YouTube Winner" className="w-9 h-9" />
        <h1 className="text-[1.5rem] font-semibold tracking-tight">YouTube Winner</h1>
      </div>
      <div className="flex gap-7 items-center">
        <div
          className="hover:cursor-pointer"
          onClick={() =>
            window.open("https://github.com/akane9506/youtube-winner", "_blank")
          }
        >
          <img
            className="w-7 h-7 opacity-60"
            src={theme === "dark" ? githubIconWhite : githubIcon}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Sun strokeWidth={1.8} size={24} />
          <Switch
            isSelected={theme === "dark"}
            onValueChange={toggleTheme}
            color="secondary"
          />
          <Moon strokeWidth={1.5} size={24} />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="min-w-[1rem] w-[3rem] h-8 text-default-700"
              variant="bordered"
            >
              {languageDiplay}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="bordered"
            onAction={(key) => updateLanguage(key as AvailableLanguagesType)}
          >
            {LANGUAGE_MENU.map((item) => (
              <DropdownItem key={item.key}>{item.text}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
