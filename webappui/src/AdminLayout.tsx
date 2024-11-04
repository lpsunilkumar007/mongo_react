// src/components/AdminLayout.tsx
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar'

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <Navbar /> 
      <Sidebar />   
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            {children} 
          </div>
        </section>
      </div>
      <footer className="main-footer">
       
      </footer>
    </div>
  );
  
};

export default AdminLayout;
