import { User } from "@/models";
import UserAvatar from "@/components/routes/results/UserAvatar";

const Users = ({ filteredUsers }: { filteredUsers: User[] }) => {
  return (
    <div className="h-full mx-auto overflow-y-auto">
      <div className="grid grid-cols-6 gap-y-6 px-10 py-4">
        {filteredUsers.map((user) => (
          <UserAvatar key={user.displayName} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
