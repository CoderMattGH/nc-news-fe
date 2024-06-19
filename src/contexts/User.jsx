import {createContext, useState} from "react";

export const UserContext = createContext();

export function UserProvider({children}) {
  const [user, setUser] = useState(null);

  const isUserLoggedIn = () => {
    if (user)
      return true;
    else
      return false;
  }

  const loginUser = (userObj) => {
    console.log("Setting logged in user in UserContext!");
    setUser(user);
  }

  const logoutUser = () => {
    console.log("Logging out user in UserContext!");
    setUser(null);
  }

  const getUser = () => {
    return user;
  }

  return (
    <UserContext.Provider value={{isUserLoggedIn, loginUser, logoutUser, getUser}}>
      {children}
    </UserContext.Provider>
  );
}