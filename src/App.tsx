import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/styles.scss';
import LostPage from './pages/errors/lost-page/lost-page';
import { AppLoading } from './common';

const UnauthenticatedPage = React.lazy(
  () => import('./pages/errors/unauthenticated-page/unauthenticated-page'),
);

const ForbiddenPage = React.lazy(
  () => import('./pages/errors/forbidden-page/forbidden-page'),
);
const Layout = React.lazy(() => import('./views/layout'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <React.Suspense fallback={<AppLoading />}>
          <Routes>
            <Route path="/unauthenticated" element={<UnauthenticatedPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/lost" element={<LostPage />} />
            <Route path="*" element={<Layout />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
