import { useState } from "react";
import Alerta from "../components/Alerta.js";
import axios from "axios";
import '../css/registrar.css';
import NavBar from "../components/NavBar.js"
import robotTransparente from '../images/robotTransparente.png';


const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [ap, setAp] = useState('');
    const [am, setAm] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState('')

    const limpiarCampos = () => {
        setNombre('');
        setEmail('');
        setTelefono('');
        setPassword('');
        setRepetirPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, email, telefono, password, repetirPassword].includes('')) {
            console.log("Hay campos vacios")
            setAlerta({
                mensaje: "Hay campos vacios",
                error: true
            })
            return
        }

        if (password != repetirPassword) {
            console.log("Los password no son inguales")
            setAlerta({
                mensaje: 'Las contraseñas no son iguales',
                error: true
            })
            return
        }

        if (password.length < 6) {
            console.log("El password es menor a 6")
            setAlerta({
                mensaje: 'El password es muy corto, agrega minimo 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        try {

            const url = "http://localhost:4000/api/user"
            await axios.post(url, { nombre, am, ap, email, telefono, password })
            setAlerta({
                mensaje: '¡Registrado con éxito! Revisa tu email para confirmar la cuenta',
                error: false
            })

            limpiarCampos()

        } catch (error) {
            console.log(error.response)
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
        }

    }


    return (
        <>
            <div className="contenedor">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-5 div">
                        <p className="fw-lighter">Te damos la bienvenida a nuestra página, por favor llena el formulario para continuar con tu registro.</p>
                        <img className="imge" src= {robotTransparente} alt="Robot Bienvenida" />
                    </div>

                    <div className="col-lg-5">
                        <div className="container-sm divForm">
                            <form className="needs-validation form" onSubmit={handleSubmit}>
                                <Alerta alerta={alerta} />

                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label text">Nombre:</label>
                                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" id="nombre" placeholder="Ej.: John Doe" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="ap" className="form-label text">Apellido Paterno:</label>
                                    <input type="text" value={ap} onChange={e => setAp(e.target.value)} className="form-control" id="ap" placeholder="Ej.: Doe" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="am" className="form-label text">Apellido Materno:</label>
                                    <input type="text" value={am} onChange={e => setAm(e.target.value)} className="form-control" id="am" placeholder="Ej.: Smith" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label text">Correo Electrónico:</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="correo" placeholder="Ej.: name@example.com" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label text">Teléfono:</label>
                                    <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} className="form-control" id="telefono" placeholder="Ej.: 7154567890" title="Introduce un número de teléfono válido"
/>                                </div>

                                <div className="mb-3">
                                    <label htmlFor="pass" className="form-label text">Contraseña:</label>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="pass" className="form-control" placeholder="Debe tener almenos 6 carácteres" aria-describedby="passwordHelpBlock" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="repetir" className="form-label text">Confirmar Contraseña:</label>
                                    <input type="password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} id="repetir" className="form-control" aria-describedby="passwordHelpBlock" />
                                </div>

                                <div className="mb-3 divButton">
                                    <button type="submit" className="btn btn-outline-primary">Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registrar;