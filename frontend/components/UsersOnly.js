import { useUser } from "./User";
import Login from "./Login";
const UsersOnly = ({ children }) => {
  const currentUser = useUser();
  if (!currentUser) {
    return (
      <>
        <Login />
      </>
    );
  }
  return <>{children}</>;
};

export default UsersOnly;
