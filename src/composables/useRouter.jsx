import { Landing, Products, Signin, SignUp } from "../components/pages";

export const useRoutes = {
  SignIn: <Signin />,
  SignUp: <SignUp />,
  Products: <Products />,
  Landing: <Landing />,
};

export const useStoreRoute = (route) => {
  if (typeof route !== "string") return;
  if (!Object.keys(useRoutes).includes(route)) return;
  localStorage.setItem("appRoute", route);
};

export const usePrevRoute = (user) => {
  const route = localStorage.getItem("appRoute");
  if (!route) {
    return !!user ? "Landing" : "SignIn";
  }
  if (!Object.keys(useRoutes).includes(route)) {
    return !!user ? "Landing" : "SignIn";
  }
  if (!user && !["SignIn", "SignUp"].includes(route)) {
    return "SignIn";
  }
  return route;
};
