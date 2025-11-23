import { Routes, Route } from "react-router-dom";

import HomePage from "../views/public/HomePage.jsx";
import CreateAccount from "../views/public/CreateAccount.jsx";
import LoginAccount from "../views/public/LoginAccount.jsx";
import DetailProduct from "../views/public/DetailProduct.jsx";
import Dashboard from "../views/private/Dashboard.jsx";
import Administradores from "../views/private/Administradores.jsx";
import Clientes from "../views/private/Clientes.jsx";
import UsuariosLocales from "../views/private/UsuariosLocales.jsx";
import UsuariosGoogle from "../views/private/UsuarioFirebase.jsx";
import NivelesUsuario from "../views/private/NivelesUsuario.jsx";
import Categorias from "../views/private/Categorias.jsx";
export default function AppRoutes() {
  return (
    <Routes>

      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/loginAccount" element={<LoginAccount />} />
      <Route path="/detailProduct" element={<DetailProduct />} />

      {/* Rutas privadas */}
      <Route path="/private/dashboard" element={<Dashboard />} />
      <Route path="/private/administradores" element={<Administradores />} />
      <Route path="/private/clientes" element={<Clientes />} />
      <Route path="/private/usuarios-locales" element={<UsuariosLocales />} />
      <Route path="/private/usuarios-firebase" element={<UsuariosGoogle />} />
      <Route path="/private/niveles-usuario" element={<NivelesUsuario />} />
      <Route path="/private/categorias" element={<Categorias/>} />
    </Routes>
  );
}
