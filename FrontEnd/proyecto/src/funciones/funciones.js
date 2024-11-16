import Typewriter from 'typewriter-effect/dist/core';

const typewriterEffect = (nombre, saludo) => {
  let app = document.getElementById('typewriter');

  if (app) {
    let typewriter = new Typewriter(app, {
      loop: true,
      delay: 75,
      cursor: "<span style='color: #16325B;'>|</span>",
    });

    typewriter
      .pauseFor(2500)
      .typeString(`<span style="color: #16325B;">${saludo}, ${nombre || "Usuario"}!</span>`)
      .pauseFor(200)
      .deleteChars((saludo.length + (nombre ? nombre.length + 2 : 8)))
      .start();
  }
};

export default typewriterEffect;
