import {
  Contacts,
  Landing,
  Products,
  Quotes,
  Signin,
  SignUp,
  Suppliers,
} from "../components/pages";

export const useRoutes = {
  Contacts: <Contacts />,
  Landing: <Landing />,
  Products: <Products />,
  Quotes: <Quotes />,
  SignIn: <Signin />,
  SignUp: <SignUp />,
  Suppliers: <Suppliers />,
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
