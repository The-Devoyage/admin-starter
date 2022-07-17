import { v4 as uuidv4 } from 'uuid';
import { Variables } from 'src/apollo';
import { Types } from 'src/types';

export const useToaster = () => {
  const triggerToast = (toast: Omit<Types.UI.Toast, 'id'>) => {
    const updatedToasts = [
      ...Variables.UI.toastsVar(),
      { ...toast, id: uuidv4() },
    ];
    Variables.UI.toastsVar(updatedToasts);
  };

  const removeToast = (id: string) => {
    const updatedToasts = Variables.UI.toastsVar().filter(
      (toast) => toast.id !== id,
    );
    Variables.UI.toastsVar(updatedToasts);
  };

  return { triggerToast, removeToast };
};
