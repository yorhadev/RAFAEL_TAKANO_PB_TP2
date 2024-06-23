import { useState } from "react";
import { RouterContext } from "../../contexts";
import { useRoutes } from "../../composables/useRouter";

export default function AppRouter({ children }) {
  const [currentRoute, setCurrentRoute] = useState("SignIn");

  return (
    <RouterContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {useRoutes[currentRoute]}
    </RouterContext.Provider>
  );
}
