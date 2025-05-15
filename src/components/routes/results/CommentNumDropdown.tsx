import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { ChevronsUpDown } from "lucide-react";

const CommentNumDropdown = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <div className="bg-default-50 w-12 h-6 flex items-center justify-center gap-1 rounded-md border-1">
            <p className="text-sm">12</p>
            <ChevronsUpDown size={14} />
          </div>
        </DropdownTrigger>
        <DropdownMenu variant="light" className="max-h-60 overflow-y-auto">
          {Array.from({ length: 21 }, (_, i) => i + 6).map((num) => {
            return <DropdownItem key={`${num}`}>{num}</DropdownItem>;
          })}
        </DropdownMenu>
      </Dropdown>
      <p className="text-sm">per page</p>
    </div>
  );
};

export default CommentNumDropdown;
