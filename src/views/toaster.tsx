import { useReactiveVar } from '@apollo/client';
import {
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CButton,
} from '@coreui/react';
import { FC } from 'react';
import { Variables } from 'src/apollo';

const Toaster: FC = () => {
  const toasts = useReactiveVar(Variables.UI.toastsVar);

  const handleDismiss = (id: string) => {
    const updatedToasts = toasts.filter((toast) => toast.id !== id);
    Variables.UI.toastsVar(updatedToasts);
  };

  return (
    <CToaster placement="top-end">
      {toasts.map((toast) => (
        <div key={toast.id}>
          <CToast visible autohide onClose={() => handleDismiss(toast.id)}>
            <CToastHeader
              closeButton
              className="d-flex justify-content-between"
              style={{ textTransform: 'capitalize' }}
            >
              {toast.header}
            </CToastHeader>
            <CToastBody>
              <div>{toast.message}</div>
              {toast.button && (
                <div className="d-flex justify-content-end mt-3">
                  <CButton
                    color="primary"
                    variant="outline"
                    size="sm"
                    onClick={toast.button.onClick}
                  >
                    {toast.button?.label}
                  </CButton>
                </div>
              )}
            </CToastBody>
          </CToast>
        </div>
      ))}
    </CToaster>
  );
};

export default Toaster;
