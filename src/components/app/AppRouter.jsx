import { useContext, useEffect, useState } from "react";
import { AuthContext, RouterContext } from "../../contexts";
import { usePrevRoute } from "../../composables/useRouter";
import { useRoutes, useStoreRoute } from "../../composables/useRouter";
import { UiNav } from "../ui";

export default function AppRouter() {
  const [currentRoute, setCurrentRoute] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser.needFetch) {
      return;
    }
    if (currentRoute !== usePrevRoute(currentUser.user)) {
      useStoreRoute(currentRoute);
    }
    setCurrentRoute(usePrevRoute(currentUser.user));
  }, [currentUser, currentRoute]);

  return (
    <RouterContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {!currentUser.needFetch && !!currentUser.user && <UiNav />}
      <main>{useRoutes[currentRoute]}</main>
    </RouterContext.Provider>
  );
}
