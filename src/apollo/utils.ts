export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const getProperty = <T extends {}, K extends keyof T>(
  obj: T | null | undefined,
  property: K,
) => {
  if (obj) {
    if (!(property in obj)) {
      throw new Error(
        `Property '${property}' was not found in this request. Check the query to ensure you have requested this property from the server.`,
      );
    }
    return obj[property];
  }
};
