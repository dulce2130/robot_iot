import React, { useContext, useEffect, useState } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import "../css/navbar.css";
import logo from '../images/logo2.webp';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const NavBar = ({ showMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileImage(response.data.perfil.profileImage || null);
      } catch (error) {
        console.error("Error al cargar la imagen de perfil:", error);
      }
    };
    fetchProfileImage();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="div-nav-img">
        <img className="logo" src={logo} alt="Robot" />
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
              <Link to="/perfil" className={location.pathname === '/perfil' ? 'active' : ''}>
                Perfil
              </Link>
            </li>
            <li>
              <div className="profile-container">
                {profileImage ? (
                  <img src={profileImage} alt="Perfil" />
                ) : (
                  <div className="placeholder"></div>
                )}
              </div>
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
