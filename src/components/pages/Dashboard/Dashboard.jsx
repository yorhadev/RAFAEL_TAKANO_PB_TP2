import { useContext } from "react";
import { RouterContext } from "../../../contexts";

export default function Dashboard({ name }) {
  const { setCurrentRoute } = useContext(RouterContext);
  const handleLinkRoute1 = (e) => {
    e.preventDefault();
    setCurrentRoute("SignIn");
  };
  const handleLinkRoute2 = (e) => {
    e.preventDefault();
    setCurrentRoute("Dashboard");
  };
  const handleLinkRoute3 = (e) => {
    e.preventDefault();
    setCurrentRoute("Dashboard2");
  };
  return (
    <div>
      {name ? name : "Dash"}
      <button onClick={handleLinkRoute1}>sign-in</button>
      <button onClick={handleLinkRoute2}>dashboard1</button>
      <button onClick={handleLinkRoute3}>dashboard2</button>
    </div>
  );
}
