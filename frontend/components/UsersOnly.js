import User from './User'
import Login from './Login'
const UsersOnly = ({ children }) => {
  return (
    <User>
      {({ currentUser }) => {
        if (!currentUser) {
          return (
            <>
              <Login />
            </>
          )
        }
        return (<>
          <h1>Hi {currentUser.name}</h1>
          {children}
  </>)
      }}
    </User>
  )
}

export default UsersOnly