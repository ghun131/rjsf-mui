export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isObjectEmpty = (obj: any): boolean => {
  if (typeof obj === "boolean" && !obj) return true;
  if (typeof obj === "string" && !obj) return true;
  if (typeof obj === "number" && obj === 0) return true;

  return Object.keys(obj).length === 0;
};
