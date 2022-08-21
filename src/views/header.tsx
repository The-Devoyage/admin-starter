import { useReactiveVar } from '@apollo/client';
import { cilMenu } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from '@coreui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Variables } from 'src/apollo';
import { LogoutButton } from 'src/common/buttons/logout';
import Breadcrumb from './breadcrumb';

function Header() {
  const isAuthenticated = useReactiveVar(Variables.Auth.isAuthenticatedVar);
  const sidebarShow = useReactiveVar(Variables.UI.sidebarShowVar);
  const navigate = useNavigate();

  return (
    <CHeader position="sticky">
      <CContainer fluid>
        <div className="d-flex align-items-center">
          {isAuthenticated && (
            <CHeaderToggler
              onClick={() => Variables.UI.sidebarShowVar(!sidebarShow)}
            >
              <CIcon icon={cilMenu} />
            </CHeaderToggler>
          )}
          <CHeaderBrand role="button" onClick={() => navigate('/')}>
            The Devoyage
          </CHeaderBrand>
        </div>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {isAuthenticated ? (
            <>
              <CNavItem>
                <CNavLink to="/" component={NavLink}>
                  Dashboard
                </CNavLink>
              </CNavItem>
            </>
          ) : (
            <>
              <CNavItem>
                <CNavLink to="/login" component={NavLink}>
                  Login
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/register">Register</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/verify-email">Verify Email</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/reset-password">Reset Password</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/reset-activation-code">
                  Reset Activation Code
                </CNavLink>
              </CNavItem>
            </>
          )}
        </CHeaderNav>
        <LogoutButton />
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <Breadcrumb />
      </CContainer>
    </CHeader>
  );
}

export default Header;
