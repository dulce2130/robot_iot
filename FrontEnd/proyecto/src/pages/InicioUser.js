import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import "../css/inicio.css";
import typewriterEffect from '../funciones/funciones.js';
import NavBar from "../components/NavBar.js";

const Inicio = () => {
    const { user } = useContext(AuthContext);
    const nombre = user?.nombre;

    const getSaludo = () => {
        const hora = new Date().getHours();
        if (hora >= 6 && hora < 12) return "¡Buenos días";
        if (hora >= 12 && hora < 18) return "¡Buenas tardes";
        return "¡Buenas noches";
    };

    useEffect(() => {
        const saludo = getSaludo();
        typewriterEffect(nombre, saludo);
    }, [nombre]);

    return (
        <>
            <NavBar showMenu={true} />


            <div className='txt-inicial'>
                <h2 className="text-primary mb-4" id="typewriter"></h2>
            </div>
        </>
    );
};

export default Inicio;
