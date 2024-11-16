import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../css/navbar.css";
import logo from '../images/logo2.webp';

const NavBar = ({ showMenu }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className='div-nav-img'>
        <img
          className='logo'
          src={logo}
          alt="Robot"
        />
        <h1 className="titulo-nav">GuardianBot</h1>
      </div>

      {showMenu && (
        <div className="menu-options">
          <ul>
            <li>
              <Link to="/inicio" className={location.pathname === '/inicio' ? 'active' : ''}>Inicio</Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Acerca de</Link>
            </li>
            <li>
              <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Servicios</Link>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contacto</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;