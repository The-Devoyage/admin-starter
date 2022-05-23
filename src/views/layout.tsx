import Content from './content';
import Header from './header';
import Sidebar from './sidebar';
import Toaster from './toaster';

function Layout() {
  return (
    <div>
      <Sidebar />
      <Toaster />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header />
        <div className="body d-flex flex-column flex-grow-1 p-3">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default Layout;
