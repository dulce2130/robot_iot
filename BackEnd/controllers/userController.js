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

    const usuarioConfirmar = await veterinario.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(404).json({ mensaje: error.message })
    }

    try {
        //usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({ mensaje: "La cuenta ha sido confirmada", confirmado: true })

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
    const { veterinario } = req;
    res.json({ perfil: veterinario })
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    try {
        const usuario = await Veterinario.findOne({ token: token });

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

export {
    registrar,
    confirmar,
    comprobarToken,
    eliminarToken,
    autenticar,
    perfil
}