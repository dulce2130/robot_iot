import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from "../components/NavBar.js"

const Inicio = () => {
    
    const { user, logout } = useContext(AuthContext);
    const nombre = user?.nombre ;


    return (
        <>

        <NavBar showMenu={true} />

        <div className='contenedor'>
            <div>
                <h1>Hola {nombre}</h1>
            </div>
        </div>

        </>
    )
}

export default Inicio;