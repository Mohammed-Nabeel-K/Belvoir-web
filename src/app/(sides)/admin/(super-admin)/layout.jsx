import React from 'react';
import Sidebar from './components/sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      <div className="ml-64 w-full overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
