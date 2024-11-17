import User from "../models/Usuario.js";
import generarID from "../helpers/generarID.js";
import generarJWT from "../helpers/generarJWT.js";
import nodemailer, { createTransport } from "nodemailer";


const registrar = async (req, res) => {
    const { email, nombre } = req.body

    const existeUsuario = await User.findOne({ email })

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ mensaje: error.message })
    }

    try {

        const user = new User(req.body)
        const userSave = await user.save()

        console.log("Eviando email...")

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sanchezeria9@gmail.com',
                pass: 'ormm foxe gchx whrh'
            }
        })

        const mailOptions = {
            from: 'sanchezeria9@gmail.com',
            to: email,
            subject: 'Confirma tu cuenta',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; background-color: #f7f7f7; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #227B94; text-align: center;">Hola, ${nombre}</h1>
        <p style="font-size: 16px;">¡Gracias por registrarte en nuestro servicio! Estamos emocionados de que te unas a nuestra comunidad. Por favor, haz clic en el botón de abajo para confirmar tu cuenta:</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/confirmar/${user.token}" 
               style="display: inline-block; padding: 12px 25px; background-color: #227B94; color: #fff; text-decoration: none; font-size: 18px; font-weight: bold; border-radius: 50px; transition: background-color 0.3s;">
                Confirmar Cuenta
            </a>
        </div>
        <p style="font-size: 16px;">Si no solicitaste esta cuenta, puedes ignorar este correo sin ningún problema. No se tomarán más acciones.</p>
        <p style="font-size: 16px;">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
        <br>
        <p style="font-size: 16px;">Saludos cordiales,</p>
        <p style="font-size: 16px; font-weight: bold;">El equipo de desarrollo</p>
        <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">Este correo fue enviado automáticamente, por favor no respondas a este mensaje.</p>
    </div>
</div>

                `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error.toString());
            }
            res.status(200).json({ mensaje: 'Correo de confirmación enviado' });
        });


    } catch (e) {
        console.log(e)
        res.status(500).json({ mensaje: "Error al registar el usuario" })
    }
}

const confirmar = async (req, res) => {
    console.log(req.params.token)

    const { token } = req.params;
    const usuarioConfirmar = await User.findOne({ token });


    if (!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(404).json({ mensaje: error.message })
    }

    try {
        //usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({ mensaje: "La cuenta ha sido confirmada", confirmado: true })

        setTimeout(async () => {
            usuarioConfirmar.confirmado = true;
            await usuarioConfirmar.save();
        }, 300000); // 300000 ms = 5 minutos


    } catch (e) {
        console.log(e)
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    const usuario = await User.findOne({ email });

    if (!usuario) {
        const error = new Error("Usuario NO existe")
        return res.status(400).json({ mensaje: error.message })
    }

    if (!usuario.confirmado) {
        const error = new Error("Tu correo no ha sido confirmado")
        return res.status(403).json({ mensaje: error.message })
    }

    if (await usuario.ComprobarPassword(password)) {
        res.json({ token: generarJWT(usuario.id), nombre: usuario.nombre })
    } else {
        const error = new Error("El password es incorrecto")
        return res.status(400).json({ mensaje: error.message })
    }
}

const perfil = (req, res) => {
    const { user } = req;
    res.json({ perfil: user })
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    try {

        const usuario = await User.findOne({ token: token });

        if (!usuario) {
            const error = new Error("Token no válido");
            return res.status(400).json({ mensaje: error.message });
        }

        res.json({ mensaje: "Token válido" });
    } catch (error) {
        console.error('Error verificando token:', error);
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};

const eliminarToken = async (req, res) => {
    const { token } = req.params;

    const usuario = await User.findOne({ token });

    if (!usuario) {
        const error = new Error("Token no valido");
        return res.status(404).json({ mensaje: error.message });
    }

    try {
        usuario.token = null;
        await usuario.save();
        res.json({ mensaje: "Token eliminado correctamente" });
    } catch (e) {
        console.log(e);
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await User.findOne({ token: token });

    if (!usuario) {
        const error = new Error("Token no válido");
        return res.status(400).json({ mensaje: error.message });
    }

    usuario.password = password;
    usuario.token = null;
    await usuario.save();
    console.log(password);
    res.json({ mensaje: "Contraseña actualizada correctamente" });
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await User.findOne({ email });

    if (!usuario) {
        const error = new Error("No existe usuario");
        return res.status(404).json({ mensaje: error.message });
    }

    usuario.token = generarID();
    await usuario.save();

    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sanchezeria9@gmail.com',
            pass: 'ormm foxe gchx whrh'
        }
    });

    const mailOptions = {
        from: 'dulcevsgonsa@gmail.com',
        to: email,
        subject: 'Restablecer Contraseña',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; background-color: #f7f7f7; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 16px;">Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para crear una nueva contraseña:</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/olvide-password/${usuario.token}" 
               style="display: inline-block; padding: 12px 25px; background-color: #227B94; color: #fff; text-decoration: none; font-size: 18px; font-weight: bold; border-radius: 50px; transition: background-color 0.3s;">
                Restablecer Contraseña
            </a>
        </div>
        <p style="font-size: 16px;">Si no solicitaste el restablecimiento de tu contraseña, puedes ignorar este correo y tu contraseña permanecerá sin cambios.</p>
        <p style="font-size: 16px;">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
        <br>
        <p style="font-size: 16px;">Saludos cordiales,</p>
        <p style="font-size: 16px; font-weight: bold;">El equipo de desarrollo</p>
        <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">Este correo fue enviado automáticamente, por favor no respondas a este mensaje.</p>
    </div>
</div>

        `
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ mensaje: "Error al enviar el correo" });
        }
        console.log('Correo enviado: ' + info.response);
    });

    res.json({ mensaje: "Se ha enviado un token de restablecimiento de contraseña" });
};

const recibirCorreo = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sanchezeria9@gmail.com',
                pass: 'ormm foxe gchx whrh'
            },
        });

        const mailOptions = {
            from: email,
            to: 'sanchezeria9@gmail.com',
            subject: `Contaco de GuardianBot de ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #1E3A8A; text-align: center;">Contacto GuardianBot</h2>
                        <p style="font-size: 16px; color: #333;">Has recibido un nuevo mensaje a través del formulario de contacto:</p>
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <p style="font-size: 16px; color: #333;"><strong>Nombre:</strong> ${name}</p>
                        <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${email}</p>
                        <p style="font-size: 16px; color: #333;"><strong>Mensaje:</strong></p>
                        <p style="font-size: 16px; color: #333;">${message}</p>
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <p style="font-size: 14px; color: #999; text-align: center;">Este correo electrónico es generado automáticamente por GuardianBot.</p>
                    </div>
                </div> `,
        };

        await transport.sendMail(mailOptions);

        res.status(200).json({ mensaje: "Mensaje enviado correctamente" });
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        res.status(500).json({ mensaje: "Hubo un error al enviar el mensaje" });
    }
};



export {
    registrar,
    confirmar,
    comprobarToken,
    eliminarToken,
    autenticar,
    perfil,
    nuevoPassword,
    olvidePassword,
    recibirCorreo,
}