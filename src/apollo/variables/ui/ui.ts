import { makeVar } from '@apollo/client';
import { Types } from 'src/types';

export const sidebarShowVar = makeVar(true);
export const toastsVar = makeVar<Types.UI.Toast[]>([]);
