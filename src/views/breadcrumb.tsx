import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from 'src/routes';

export interface Breadcrumb {
  pathname: string;
  name: string;
  active: boolean;
}

function Breadcrumb() {
  const currentLocation = useLocation().pathname;
  const navigate = useNavigate();

  const getRouteName = (pathname: string) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location: string) => {
    const breadcrumbs: Breadcrumb[] = [];

    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname);
      if (routeName) {
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length,
        });
      }
      return currentPathname;
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <CBreadcrumb className="m-0 ms-3">
      {breadcrumbs.map((breadcrumb) => (
        <CBreadcrumbItem
          active={breadcrumb.active}
          onClick={() => !breadcrumb.active && navigate(breadcrumb.pathname)}
          key={breadcrumb.name}
          style={{
            textDecoration: !breadcrumb.active ? 'underline' : undefined,
            cursor: !breadcrumb.active ? 'pointer' : 'auto',
          }}
        >
          {breadcrumb.name}
        </CBreadcrumbItem>
      ))}
    </CBreadcrumb>
  );
}

export default Breadcrumb;
