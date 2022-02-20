import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState(null);

  // Updating context if data present in local storage
  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("auth")));
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
