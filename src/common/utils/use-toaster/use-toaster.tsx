import { v4 as uuidv4 } from 'uuid';
import { useReactiveVar } from '@apollo/client';
import { Variables } from 'src/apollo';
import { Types } from 'src/types';

export const useToaster = () => {
  const toasts = useReactiveVar(Variables.UI.toastsVar);

  const triggerToast = (toast: Omit<Types.UI.Toast, 'id'>) => {
    const updatedToasts = [...toasts, { ...toast, id: uuidv4() }];
    Variables.UI.toastsVar(updatedToasts as Types.UI.Toast[]);
  };

  const removeToast = (id: string) => {
    const updatedToasts = toasts.filter((toast) => toast.id !== id);
    Variables.UI.toastsVar(updatedToasts);
  };

  return { triggerToast, removeToast };
};
