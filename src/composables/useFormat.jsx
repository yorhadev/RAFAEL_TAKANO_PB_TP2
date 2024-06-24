export const useCurrency = (val) => {
  const currency = new Intl.NumberFormat().format(val);
  return `R$ ${currency}`;
};

export const useDate = (timestamp) => {
  return new Date(timestamp).toISOString().substring(0, 10);
};

export const useUpper = (str) => {
  return String(str).toUpperCase();
};
