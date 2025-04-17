import { Avatar } from "@heroui/react";
import { User } from "@/models";

const UserAvatar = ({ user, size = "lg" }: { user: User; size?: "lg" | "sm" | "md" }) => {
  return (
    <div className="flex flex-col group gap-1 items-center py-2">
      <Avatar
        key={user.displayName}
        src={user.profileImageUrl}
        isBordered={true}
        size={size}
        radius={size === "lg" ? "lg" : "full"}
      />
      <a href={user.channelUrl} target="_blank" className="text-sm group-hover:underline">
        {user.displayName}
      </a>
    </div>
  );
};

export default UserAvatar;
