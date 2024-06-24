import { useEffect, useState } from "react";
import { AuthContext } from "../../contexts";
import firebaseService from "../../services/firebaseService";
import { useAuth, useUpdateAuth } from "../../composables/useAuth";

export default function AppAuth({ children }) {
  const [currentUser, setCurrentUser] = useState(useAuth);

  useEffect(() => {
    // firebaseService.auth.signOut();

    if (!currentUser.needFetch) return;

    firebaseService.auth.onAuthStateChanged((user) => {
      setCurrentUser(useUpdateAuth(user));
    });
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
      {/* {JSON.stringify(currentUser)} */}
    </AuthContext.Provider>
  );
}
