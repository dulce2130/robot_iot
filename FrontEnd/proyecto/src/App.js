import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js";

import Login from './pages/Login.js';
import Registrar from './pages/Registrar.js';
import ConfirmarCuenta from './pages/ConfirmarCuenta.js';
import OlvidePassword from './pages/OlvidePassword.js';
import Inicio from './pages/InicioUser.js';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route>

          <Route index element={<Login />} />
          <Route path='registrar' element={<Registrar />} />
          <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
          <Route path='olvide-password' element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<OlvidePassword />} />
          <Route path='inicio' element = {<Inicio />} />


          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
