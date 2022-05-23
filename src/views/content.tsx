import { useReactiveVar } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Variables } from 'src/apollo';
import LostPage from 'src/pages/errors/lost-page/lost-page';
import { routes } from 'src/routes';
import { Types } from 'src/types';

function OnlyUnauth({ children }: { children: JSX.Element }) {
  const authenticated = useReactiveVar(Variables.Auth.isAuthenticatedVar);
  const location = useLocation();

  if (authenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function Protect({ children }: { children: JSX.Element }) {
  const authenticated = useReactiveVar(Variables.Auth.isAuthenticatedVar);
  const location = useLocation();
  const token = localStorage.getItem('token');

  let expired = false;

  if (token) {
    const decoded: Types.Auth.Decoded = jwtDecode(token);
    if (decoded.exp) {
      expired = Date.now() + decoded.exp < Date.now();
    } else {
      expired = true;
    }
  }

  if (!authenticated || expired) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Content() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <>
              {route.allow === 'AUTHENTICATED' && (
                <Protect>
                  <route.component />
                </Protect>
              )}

              {route.allow === 'UNAUTHENTICATED' && (
                <OnlyUnauth>
                  <route.component />
                </OnlyUnauth>
              )}

              {route.allow === 'BOTH' && <route.component />}
            </>
          }
        />
      ))}
      <Route path="*" element={<LostPage />} />
    </Routes>
  );
}

export default Content;
