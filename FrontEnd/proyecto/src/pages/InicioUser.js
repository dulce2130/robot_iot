import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import "../css/inicio.css";
import typewriterEffect from '../funciones/funciones.js';
import NavBar from "../components/NavBar.js";
import Charts from "../components/Charts.js";
import Footer from "../components/Footer.js";


const Inicio = () => {
    const { user } = useContext(AuthContext);
    const nombre = user?.nombre;
    const [currentTime, setCurrentTime] = useState(new Date());

    const [sensorData, setSensorData] = useState({
        temperature: "Cargando...",
        humidity: "Cargando...",
        gas: "Cargando...",
        sound: "Cargando..."
    });

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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); 
        return () => clearInterval(timer); 
    }, []);

    useEffect(() => {
        const fetchSensorData = () => {
            fetch("http://localhost:4000/api/sensors/latest")
                .then((res) => res.json())
                .then((data) => {
                    setSensorData({
                        temperature: `${data.temperature} °C`,
                        humidity: `${data.humidity} %`,
                        gas: `${data.gas} ppm`,
                        sound: `${data.sound} dB`
                    });
                })
                .catch((err) => console.error("Error fetching sensor data:", err));
        };
    
        fetchSensorData();
    
        const interval = setInterval(fetchSensorData, 3000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <>
            <NavBar showMenu={true} />

            <div className='txt-inicial'>
                <h2 className="text-primary mb-4" id="typewriter"></h2>
                <div className="user-info">
                    <p>Última sesión: {new Date().toLocaleDateString()}</p>
                    <p>Te damos la bienvenida nuevamente.</p>
                </div>
            </div>

            <div className='datos-charts'>
                <aside className="datos-actuales">
                    <h2 className="datos-title">Datos Actuales</h2>
                    <div className="current-time">
                        <p>
                            <strong>Fecha:</strong> {currentTime.toLocaleDateString('es-MX')}
                        </p>
                        <p>
                            <strong>Hora:</strong> {currentTime.toLocaleTimeString('es-MX')}
                        </p>
                    </div>
                    <ul className="datos-list">
                        <li>
                            <strong>🌡️ Temperatura:</strong> {sensorData.temperature}
                        </li>
                        <li>
                            <strong>💧 Humedad:</strong> {sensorData.humidity}
                        </li>
                        <li>
                            <strong>🛢️ Concentración de Gas:</strong> {sensorData.gas}
                        </li>
                        <li>
                            <strong>🔊 Ruido:</strong> {sensorData.sound}
                        </li>
                    </ul>
                </aside>
                <Charts />

            </div>

            <Footer />
        </>
    );
};

export default Inicio;
