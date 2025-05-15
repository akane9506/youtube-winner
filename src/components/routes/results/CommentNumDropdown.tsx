import { useContext } from "react";
import { PreferenceContext } from "@/contexts/PreferenceContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { ChevronsUpDown } from "lucide-react";

const CommentNumDropdown = () => {
  const { commentsPerPage, updateCommentsPerPage } = useContext(PreferenceContext);

  const handleSelect = (key: string) => {
    const numComments = parseInt(key.split("-").slice(-1)[0]);
    updateCommentsPerPage(numComments);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Dropdown className="min-w-20">
        <DropdownTrigger className="hover:cursor-pointer">
          <div className="bg-default-50 w-12 h-6 flex items-center justify-center gap-1 rounded-md border-1">
            <p className="text-sm">{commentsPerPage}</p>
            <ChevronsUpDown size={14} />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          variant="light"
          className="max-h-60 overflow-y-auto"
          onAction={(key) => handleSelect(key as string)}
        >
          {Array.from({ length: 21 }, (_, i) => i + 6).map((num) => {
            return (
              <DropdownItem
                key={`comments-per-page-${num}`}
                className="w-12"
                textValue={`${num}`}
              >
                <p>{num}</p>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <p className="text-sm">per page</p>
    </div>
  );
};

export default CommentNumDropdown;
