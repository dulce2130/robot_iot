import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import axios from 'axios';
import '../css/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:4000/api/user/login', { email, password });
            const { token, nombre } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ email, nombre }));

            const userData = { email, nombre };
            login(userData);

            navigate('/inicio');

        } catch (error) {
            setError(error.response?.data?.mensaje || 'Error en el servidor');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>¡Bienvenido de nuevo!</h1>
                <p class="fw-light">Ingrese sus datos para continuar</p>
                <form onSubmit={handleLogin}>
                
                    <div className="input-container">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            required 
                        />
                    </div>
                    <div className="input-container">
                        <label>Contraseña:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            required 
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="login-button">Iniciar</button>
                    <div className="login-links">
                        <Link to="/olvide-password">¿Olvidaste tu contraseña?</Link>
                        <Link to="/registrar">Registrate aquí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;