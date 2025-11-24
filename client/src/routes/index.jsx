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
import EstadoProducto from "../views/private/EstadoProducto.jsx";
import Productos from "../views/private/Productos.jsx";
import Ofertas from "../views/private/ProductosOfertas.jsx";
import Valoraciones from "../views/private/Valoraciones.jsx";
import Pedidos from "../views/private/Pedidos.jsx";
import DetallePedido from "../views/private/DetallePedido.jsx";
import EstadoPedido from "../views/private/EstadoPedido.jsx";
import MetodoPago from "../views/private/MetodoPago.jsx";
import Pagos from "../views/private/Pagos.jsx";
import Entregas from "../views/private/Entregas.jsx";
import Login from "../views/private/Login.jsx";
import Cuenta from "../views/private/createAccount.jsx";
import Token from "../views/private/token.jsx";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/loginAccount" element={<LoginAccount />} />
      <Route path="/detailProduct" element={<DetailProduct />} />

      {/* Rutas privadas */}
      <Route path="/private/login" element={<Login/>}/>
      <Route path="/private/createAccount" element={<Cuenta/>}/>
      <Route path="/private/dashboard" element={<Dashboard />} />
      <Route path="/token" element={<Token/>}/>
      <Route path="/private/administradores" element={<Administradores />} />
      <Route path="/private/usuarios/clientes" element={<Clientes />} />
      <Route path="/private/usuarios/usuario-local" element={<UsuariosLocales />} />
      <Route path="/private/usuarios/usuarios-firebase" element={<UsuariosGoogle />} />
      <Route path="/private/usuarios/niveles-usuario" element={<NivelesUsuario />} />
      <Route path="/private/productos/categorias" element={<Categorias/>} />
      <Route path="/private/productos/estado-producto" element={<EstadoProducto/>}/>
      <Route path="/private/productos" element={<Productos/>} />
      <Route path="/private/productos/ofertas" element={<Ofertas/>} />
      <Route path="/private/productos/valoraciones" element={<Valoraciones/>} />
      <Route path="/private/pedidos" element={<Pedidos/>}/>
      <Route path="/private/pedidos/detalle-pedido" element={<DetallePedido/>} />
      <Route path="/private/pedidos/estado-pedido" element={<EstadoPedido/>} />
      <Route path="/private/pedidos/entregas" element={<Entregas/>} />
      <Route path="/private/pedidos/metodo-de-pago" element={<MetodoPago/>} />
      <Route path="/private/pedidos/pagos" element={<Pagos/>} />
      <Route path="/private/ubicaciones/administrar-direcciones" element={<Pedidos/>}/>
      <Route path="/private/ubicaciones/administrar-departamentos" element={<DetallePedido/>} />
      <Route path="/private/ubicaciones/administrar-municipios" element={<EstadoPedido/>} />
      <Route path="/private/usuarios/actividad-usuarios" element={<MetodoPago/>} />
    </Routes>
  );
}
