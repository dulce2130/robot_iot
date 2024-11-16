import React, { useContext } from 'react'; // Importa useContext
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate
import "../css/navbar.css";
import logo from '../images/logo2.webp';
import { AuthContext } from "../context/AuthContext";

const NavBar = ({ showMenu }) => {
  const location = useLocation();

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

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
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contacto</Link>
            </li>
            <li>
              <Link to="/services" className={location.pathname === '/perfil' ? 'active' : ''}>Perfil</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;