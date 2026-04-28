import { UsersList } from "@/components/admin/users/users-list";
import { getErrorMessage } from "@/lib/error-handler";
import { userServerService } from "@/services/users/user.server";
import { User } from "@/types/user";
const UsersPage = async () => {
  let users: User[] = [];
  try {
    const response = await userServerService.getAll();
    users = response.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div>
      <UsersList users={users} />
    </div>
  );
};

export default UsersPage;
