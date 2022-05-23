export interface Toast {
  header: string;
  message: string;
  id: string;
  button?: ToastButton;
}

export interface ToastButton {
  label: string;
  onClick: () => void;
}
