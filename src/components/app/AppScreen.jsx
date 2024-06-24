import { useState } from "react";
import { ScreenContext } from "../../contexts";
import { useScreen } from "../../composables/useScreen";
import { UiAlert } from "../ui";

export default function AppScreen({ children }) {
  const [appScreen, setAppScreen] = useState(useScreen);

  return (
    <ScreenContext.Provider value={{ appScreen, setAppScreen }}>
      <UiAlert alert={appScreen.screenAlert} />
      {children}
    </ScreenContext.Provider>
  );
}
