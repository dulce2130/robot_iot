import React from "react";
import "../css/contacto.css";

import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";

const Contacto = () => {
  return (
    <>
    <NavBar showMenu={true}/>

    <div className="contacto-container">
      <h1 className="contacto-title">Contáctanos</h1>
      <p className="contacto-description">
        Estamos aquí para ayudarte. Por favor, completa el formulario y nos pondremos en contacto contigo lo antes posible.
      </p>
      <form className="contacto-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" placeholder="Ingresa tu nombre" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" placeholder="Ingresa tu correo electrónico" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje" required></textarea>
        </div>
        <button type="submit" className="contacto-button">Enviar Mensaje</button>
      </form>
    </div>

    <Footer />
    </>
  );
};

export default Contacto;
