export const useAuth = {
  user: null,
  needFetch: true,
};

export const useUpdateAuth = (user) => {
  return {
    user: user,
    needFetch: false,
  };
};
