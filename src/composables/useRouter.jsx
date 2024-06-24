import { Dashboard, Signin, SignUp } from "../components/pages";

export const useRoutes = {
  SignIn: <Signin />,
  SignUp: <SignUp />,
  Dashboard: <Dashboard name="Dashboard1" />,
  Dashboard2: <Dashboard name="Dashboard2" />,
};

export const useStoreRoute = (route) => {
  if (typeof route !== "string") return;
  if (!Object.keys(useRoutes).includes(route)) return;
  localStorage.setItem("appRoute", route);
};

export const usePrevRoute = (user) => {
  const route = localStorage.getItem("appRoute");
  if (!route) {
    return !!user ? "Dashboard" : "SignIn";
  }
  if (!Object.keys(useRoutes).includes(route)) {
    return !!user ? "Dashboard" : "SignIn";
  }
  if (!user && !["SignIn", "SignUp"].includes(route)) {
    return "SignIn";
  }
  return route;
};
