/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* <li className="nav-item">
              </li> */}
              <li className="nav-item">
              <h3> Start Type Script</h3>
              </li>
            </ul>
            <button data-widget="logout" className="btn btn-danger ms-auto" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
  
  
  
};

export default Navbar;

 