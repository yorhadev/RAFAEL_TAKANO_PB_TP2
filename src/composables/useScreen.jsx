export const useScreen = {
  screenAlert: {
    message: "",
    severity: "info",
    variant: "",
  },
};

export const useScreenAlert = (message, severity, variant) => {
  return {
    ...useScreen,
    screenAlert: {
      message: message,
      severity: severity,
      variant: variant,
    },
  };
};
