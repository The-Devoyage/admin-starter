export const humanizeString = (string: string) => {
  const re = /[_-]/g;

  const formatted = string.replace(re, ' ');

  return formatted;
};
