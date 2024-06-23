import { useContext } from "react";
import { RouterContext } from "../../../contexts";

export default function Dashboard() {
  const { setCurrentRoute } = useContext(RouterContext);
  const handleLinkRoute = (e) => {
    e.preventDefault();
    setCurrentRoute("SignIn");
  };
  return (
    <div>
      Dash
      <button onClick={handleLinkRoute}>return</button>
    </div>
  );
}
