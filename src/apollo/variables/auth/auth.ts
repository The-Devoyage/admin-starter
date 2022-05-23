import { makeVar } from '@apollo/client';

export const isAuthenticatedVar = makeVar(
  !!localStorage.getItem('token') ?? false,
);
