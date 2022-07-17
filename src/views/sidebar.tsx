import { useReactiveVar } from '@apollo/client';
import { CNavItem, CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react';
import { NavLink } from 'react-router-dom';
import { Variables } from 'src/apollo';

function Sidebar() {
  const sidebarShow = useReactiveVar(Variables.UI.sidebarShowVar);
  const isAuthenticated = useReactiveVar(Variables.Auth.isAuthenticatedVar);

  return (
    <CSidebar
      position="fixed"
      visible={isAuthenticated && sidebarShow}
      onHide={() => Variables.UI.sidebarShowVar(false)}
    >
      <CSidebarBrand className="d-none d-md-flex">The Devoyage</CSidebarBrand>
      <CSidebarNav>
        <CNavItem to="/" component={NavLink}>
          Dashboard
        </CNavItem>
        <CNavItem to="/accounts" component={NavLink}>
          Accounts
        </CNavItem>
        <CNavItem to="/users" component={NavLink}>
          Users
        </CNavItem>
        <CNavItem to="/media" component={NavLink}>
          Media
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Sidebar;
