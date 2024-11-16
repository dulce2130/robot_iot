import Typewriter from 'typewriter-effect/dist/core';

const typewriterEffect = (nombre, saludo) => {
  let app = document.getElementById('typewriter');

  if (app) {
    let typewriter = new Typewriter(app, {
      loop: true,
      delay: 75,
      cursor: "<span style='color: #fb4993;'>|</span>",
    });

    typewriter
      .pauseFor(2500)
      .typeString(`<span style="color: #fb4993;">${saludo}, ${nombre || "Usuario"}!</span>`)
      .pauseFor(200)
      .deleteChars((saludo.length + (nombre ? nombre.length + 2 : 8)))
      .start();
  }
};

export default typewriterEffect;
