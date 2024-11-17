import React from "react";
import "../css/footer.css";
import { Link, useLocation } from 'react-router-dom'; 

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>GuardianBot "Seisito"</h3>
        <p>Tu aliado en seguridad y monitoreo inteligente.</p>
        <ul className="footer-links">
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Acerca de</Link></li>
          <li><Link to="/contact" className={location.pathname === '/servicios' ? 'active' : ''}>Servicios</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contacto</Link></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GuardianBot. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
