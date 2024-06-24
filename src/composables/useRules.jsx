export const useEmail = (str) => {
  if (!str) return false;
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(str);
};

export const useMinLen = (str) => {
  if (!str) return false;
  return str.length >= 6;
};

export const useRequired = (str) => {
  return !!str;
};

export const useNumber = (str) => {
  if (!str) return false;
  return !isNaN(str);
};
