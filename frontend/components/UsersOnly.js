import User from "./User";
import Login from "./Login";
const UsersOnly = ({ children }) => {
  return (
    <User>
      {({ data: { currentUser } }) => {
        if (!currentUser) {
          return (
            <>
              <Login />
            </>
          );
        }
        return <>{children}</>;
      }}
    </User>
  );
};

export default UsersOnly;
