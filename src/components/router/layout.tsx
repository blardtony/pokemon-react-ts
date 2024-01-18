import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};

export default Layout;
