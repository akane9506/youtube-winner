import { useContext } from "react";
import { PreferenceContext } from "@/contexts/PreferenceContext";
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

const Header = () => {
  const { theme, language, toggleTheme, updateLanguage } = useContext(PreferenceContext);
  const languageDiplay = LANGUAGE_MENU.find((item) => item.key === language)?.text;
  return (
    <div className="flex items-center justify-between px-5 py-2 border-b-1 border-foreground/30">
      <div>
        <h1 className="text-[1.5rem] font-semibold tracking-wide">YouTube Draw</h1>
      </div>
      <div className="flex gap-7 items-center">
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
