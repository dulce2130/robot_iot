import React, { useState } from "react";
import "../css/contacto.css";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import Alerta from "../components/Alerta";
import axios from "axios";

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [alerta, setAlerta] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/user/recibir-correo", formData);
            setAlerta({ mensaje: response.data.mensaje, error: false });
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setAlerta({
                mensaje:
                    error.response?.data?.mensaje || "Hubo un error al enviar el mensaje",
                error: true,
            });
        }

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    };

    return (
        <>
            <NavBar showMenu={true} />

            <div className="contacto-container">
                <h1 className="contacto-title">Contáctanos</h1>
                <p className="contacto-description">
                    Estamos aquí para ayudarte. Por favor, completa el formulario y nos
                    pondremos en contacto contigo lo antes posible.
                </p>

                <Alerta alerta={alerta} />

                <form className="contacto-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ingresa tu nombre"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Escribe tu mensaje"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="contacto-button">
                        Enviar Mensaje
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default Contacto;
