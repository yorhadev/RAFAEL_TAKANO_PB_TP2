import { useState } from "react";
import { AuthContext } from "../../contexts";

export default function AppAuth({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
