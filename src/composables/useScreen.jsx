export const useScreen = {
  screenAlert: {
    message: "",
    severity: "info",
    variant: "",
  },
  screenLoading: false,
};

export const useScreenAlert = (message, severity) => {
  return {
    ...useScreen,
    screenAlert: {
      message: message,
      severity: severity,
    },
  };
};

export const useScreenLoading = (loading) => {
  return {
    ...useScreen,
    screenLoading: loading,
  };
};
