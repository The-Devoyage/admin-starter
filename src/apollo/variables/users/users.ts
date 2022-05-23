import { makeVar } from '@apollo/client';

export const selectedUserIdVar = makeVar<string | null>(null);
