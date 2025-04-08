import { Avatar } from "@heroui/react";
import { User } from "@/models";

const UserAvatar = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col group gap-1 items-center">
      <Avatar
        key={user.displayName}
        src={user.profileImageUrl}
        isBordered={true}
        size="lg"
        radius="lg"
      />
      <a href={user.channelUrl} target="_blank" className="text-sm group-hover:underline">
        {user.displayName}
      </a>
    </div>
  );
};

export default UserAvatar;
