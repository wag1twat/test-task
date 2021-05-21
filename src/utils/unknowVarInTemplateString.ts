export const unknowVarInTemplateString = (str: string, fallback: string) => {
  if (str.includes("undefined")) {
    return fallback;
  }

  return str;
};
