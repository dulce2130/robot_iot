import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>GuardianBot "Seisito"</h3>
        <p>Tu aliado en seguridad y monitoreo inteligente.</p>
        <ul className="footer-links">
          <li><a href="#about">Acerca de</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GuardianBot. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
