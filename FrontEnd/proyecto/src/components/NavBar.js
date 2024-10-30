import React from 'react';
import "../css/navbar.css"

const NavBar = ({ showMenu }) => {
    return (
      <nav className="navbar">
        <div className='div-nav-img'>
          <img
            className='logo'
            src="https://i.pinimg.com/736x/a3/f9/fa/a3f9faba1e9acaac41f1f6494eeb0e68.jpg"
            alt="Robot" />
          <h1 className="titulo-nav">TecnoTim</h1>
        </div>

        {showMenu && (
            <div className="menu-options">
            <ul>
              <li><a href="#home">Inicio</a></li>
              <li><a href="#about">Acerca de</a></li>
              <li><a href="#services">Servicios</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>
        )}

      </nav>
    );
  };
  
  export default NavBar;