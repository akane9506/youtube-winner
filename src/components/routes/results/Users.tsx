import { User } from "@/models";
import UserAvatar from "@/components/routes/results/UserAvatar";

const Users = ({ filteredUsers }: { filteredUsers: User[] }) => {
  return (
    <div className="grid grid-cols-6 h-fit gap-y-6 overflow-y-auto mx-auto px-10 py-4">
      {filteredUsers.map((user) => (
        <UserAvatar key={user.displayName} user={user} />
      ))}
    </div>
  );
};

export default Users;
