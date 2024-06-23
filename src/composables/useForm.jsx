export const useTextField = (name, label = null) => {
  return {
    name,
    label,
    error: null,
    helperText: "",
    value: "",
  };
};

export const useClearError = (input, update) => {
  if (!("error" in input)) return { ...input };
  if (!("helperText" in input)) return { ...input };
  if (!update) return { ...input };
  return { ...input, error: null, helperText: "" };
};

export const useCustomLabel = (input) => {
  if (!("label" in input)) return "Campo";
  if (!input?.label) return "Campo";
  return input.label;
};

export const useCustomHelperText = (input) => {
  if (!("customHelperText" in input)) return "inválido(a)";
  if (!input?.customHelperText) return "inválido(a)";
  return input.customHelperText;
};
