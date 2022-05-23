import { cilAccountLogout } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { Variables } from 'src/apollo';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Variables.Auth.isAuthenticatedVar(false);

    navigate('/login');
  };

  return (
    <CButton color="primary" onClick={handleLogout}>
      <CIcon icon={cilAccountLogout} />
    </CButton>
  );
};
