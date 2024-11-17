import React from "react";
import "../css/about.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <NavBar showMenu={true} />
      <div className="about-container">
        <h1 className="about-title">Sobre Nosotros</h1>
        <div className="about-content">
          <p className="about-description">
            Somos un equipo de estudiantes universitarios apasionados por la tecnología, la innovación y la solución de problemas. Nuestra misión es utilizar nuestras habilidades en desarrollo de software, diseño y tecnología para crear proyectos que impacten positivamente en la vida de las personas.
          </p>

          <div className="about-section">
            <h2>Nuestra Visión</h2>
            <p>
              Aspiramos a ser un ejemplo de cómo la tecnología puede ser utilizada para resolver desafíos cotidianos. A través de proyectos como GuardianBot, buscamos mejorar la seguridad y brindar tranquilidad a las familias.
            </p>
          </div>

          <div className="about-section">
            <h2>¿Por qué GuardianBot?</h2>
            <p>
              GuardianBot nació como un proyecto académico que buscaba brindar soluciones de seguridad móvil accesibles y efectivas. Con un enfoque en el monitoreo ambiental, combinamos innovación tecnológica y diseño intuitivo para ofrecer un producto que protege a las personas.
            </p>
          </div>

          <div className="about-section">
            <h2>¿Quiénes Somos?</h2>
            <ul>
              <li><strong>Dulce:</strong> Estudiante de ISC y </li>
              <li><strong>Beyanit:</strong> </li>
              <li><strong>Angelica:</strong> </li>
              <li><strong>Karen: </strong> </li>
              <li><strong>Cinthya: </strong> </li>
            </ul>
            <p>
              Todos compartimos el compromiso de aprender, crecer y crear soluciones útiles.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
