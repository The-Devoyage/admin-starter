export const isValidObjectId = (v?: string) => {
  if (v && v.match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  }
  return false;
};
