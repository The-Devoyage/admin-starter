import { CSpinner } from '@coreui/react';

export const AppLoading = () => (
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CSpinner />
  </div>
);
