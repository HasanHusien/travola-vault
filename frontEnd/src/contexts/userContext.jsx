import { createContext, useContext, useState } from "react";

const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState("");

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

function useUser() {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("user was used outside of scope");
  }

  return context;
}

export { UserProvider, useUser };
