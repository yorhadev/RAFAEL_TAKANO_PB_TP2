import { Alert, Box, Collapse } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../../contexts";
import { useScreenAlert } from "../../composables/useScreen";

export default function UiAlert({ alert }) {
  const [collapse, setCollapse] = useState(false);
  const { setAppScreen } = useContext(ScreenContext);

  useEffect(() => {
    const clear = () => {
      const cleanup = useScreenAlert("", alert.severity);
      setAppScreen(cleanup);
    };

    const trigger = async () => {
      setCollapse(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setCollapse(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      clear();
    };

    if (alert.message) trigger();
  }, [alert.message]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: 500,
        zIndex: 10,
      }}
    >
      <Collapse in={collapse}>
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Collapse>
    </Box>
  );
}
