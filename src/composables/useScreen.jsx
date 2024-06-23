export const useScreen = {
  screenAlert: {
    message: "",
    severity: "info",
    variant: "",
  },
  screenLoading: false,
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

export const useScreenLoading = (loading) => {
  return {
    ...useScreen,
    screenLoading: loading,
  };
};
