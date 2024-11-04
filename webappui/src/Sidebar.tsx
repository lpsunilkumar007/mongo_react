import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; 
const Sidebar: React.FC = () => {
  return (
    <div className="d-flex">
      <nav className="bg-light sidebar" style={{ minWidth: '250px', height: '100vh' }}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="./dashboard">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./employee">
              Employees
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              User
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    
    </div>
  );
  
};

export default Sidebar;
