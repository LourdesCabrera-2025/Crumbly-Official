import "../../styles/private/dashboard.css";
import React, { useState, useEffect } from "react";
import {
  Search,
  MoonFill,
  BellFill,
  PencilSquare,
  GearWideConnected,
  ChevronDown,
  Headset,
  BoxArrowRight,
  PersonFillGear,
  PersonFill,
  BoxSeamFill,
  UiChecks,
  GeoFill,
  ListNested,
  FileArrowDown,
  Trash,
} from "react-bootstrap-icons";
import { useDashboardStates } from "../../hooks/dashboardStates.js";
import AdminTable from "../../components/private/tabs.jsx";
import ModalTipoUsuario from "../../components/private/Modals/ModalTipoUsuario.jsx";
import { getAllTipos, deleteTipoUsuario } from "../../services/nivelesIUsers.service.js";

export function NivelesUsuario() {
  const { navigate } = useDashboardStates();

  // Estados
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalModo, setModalModo] = useState("crear"); // "crear" | "editar"
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

  // Obtener tipos de usuario
  const fetchTipos = async () => {
    setLoading(true);
    const result = await getAllTipos();
    setTipos(result.data); // siempre un array
    setLoading(false);
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  // Editar
  const handleEditar = (tipo) => {
    setTipoSeleccionado(tipo);
    setModalModo("editar");
    setModalVisible(true);
  };

  // Eliminar
  const handleEliminar = async (id) => {
    if (confirm("¿Deseas eliminar este tipo de usuario?")) {
      const result = await deleteTipoUsuario(id);
      if (result.error) {
        alert("Error al eliminar el tipo de usuario.");
      } else {
        fetchTipos();
      }
    }
  };

  // Columnas de AdminTable
  const columns = [
    { key: "id_tipo_usuario", label: "#" },
    { key: "tipo_usuario", label: "Nivel" },
  ];

  const actions = [
    ({ row }) => (
      <button className="btn btn-sm btn-ghost !p-5" onClick={() => handleEditar(row)}>
        <PencilSquare />
      </button>
    ),
    ({ row }) => (
      <button
        className="btn btn-sm btn-error !p-5"
        onClick={() => handleEliminar(row.id_tipo_usuario)}
      >
        <Trash />
      </button>
    ),
  ];
  return (
    <>
      <div className="drawer lg:drawer-open fixed top-0 left-0 ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full flex justify-between px-4" id="navbar-dashboard">
            <div className="w-50 flex items-center">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
                id="icon-sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <a
                className="px-4 cursor-pointer"
                id="title-dashboard"
                onClick={() => navigate("/private/dashboard")}
              >
                CRUMBLY
              </a>
            </div>

            <div className="grow"></div>
            <label
              htmlFor="input"
              id="input-container"
              className="max-w-lg w-full relative mx-4 overflow-hidden sm:overflow-visible"
            >
              <Search className="absolute left-[1rem] top-1/2 -translate-y-1/2 h-5 opacity-50 pointer-events-none z-10 hidden sm:block" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-60 pointer-events-none z-10 hidden sm:block">
                <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
              </div>
              <input
                type="search"
                className="grow !pl-10 input input-bordered w-full pr-16 hidden sm:block"
                placeholder="Search"
                id="input"
              />
            </label>
            <div className="grow"></div>
            <button id="container-options-dashboard" className="btn btn-ghost">
              <MoonFill className="absolute" />
            </button>
            <div className="indicator">
              <span className="indicator-item badge badge-primary !m-3 !mr-8 w-[2rem]">15</span>
              <button id="container-notify-dashboard" className="btn btn-ghost relative">
                <BellFill />
              </button>
            </div>
            <div className="dropdown dropdown-end flex items-start group">
              <div tabIndex={0} className="flex items-center justify-start cursor-pointer">
                <button id="container-profile-dashboard" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      className="object-cover"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop"
                    />
                  </div>
                </button>
                <p className="!-ml-5 !mr-3" id="name-user">Cregan</p>
                <ChevronDown className="transition-transform duration-300 group-focus-within:rotate-180 !mr-5" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-xl shadow-lg w-60 p-3 z-[900]"
                id="options-profile"
              >
                <div className="px-2 pt-2">
                  <p className="font-semibold text-lg" id="username">Cregan</p>
                  <div className="!pb-4 mb-4">
                    <p className="text-sm text-gray-500" id="email">cregan@pimjo.com</p>
                  </div>
                </div>
                <li className="li-option-profile">
                  <a className="flex gap-3 items-start py-3 rounder-lg" id="a-option-profile">
                    <PencilSquare className="text-lg" /> Editar perfil
                  </a>
                </li>
                <li className="li-option-profile">
                  <a className="flex gap-3 items-start py-3 rounded-lg" id="a-option-profile">
                    <GearWideConnected className="text-lg" /> Configuración de cuenta
                  </a>
                </li>
                <li className="li-option-profile border-b border-gray-500/30 !pb-3">
                  <a className="flex gap-3 items-start py-3 rounded-lg w-full" id="a-option-profile">
                    <Headset className="text-lg" /> Soporte técnico
                  </a>
                </li>
                <li className="li-option-profile">
                  <a className="flex gap-3 items-start py-3 rounded-lg text-error" id="a-option-profile">
                    <BoxArrowRight className="text-lg" /> Cerrar Sesión
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Page content */}
          <div className="drawer-content h-screen overflow-y-auto">
            <div className="user-welcome !py-6 flex justify-start items-center w-full" id="container-message">
              <h1 className="menu-title" id="title-user">Niveles de Usuarios</h1>
            </div>

            <div className="download-pdf flex justify-between items-center w-full !p-4">
              <button className="btn btn-ghost" id="btn-PDF">
                <FileArrowDown /> Descargar PDF
              </button>

              <button
                className="btn btn-ghost"
                id="btn-Add"
                onClick={() => {
                  setModalModo("crear");
                  setTipoSeleccionado(null);
                  setModalVisible(true);
                }}
              >
                <PersonFill /> Agregar Nivel de Usuario
              </button>
            </div>

            <div className="!p-4">
              {loading ? (
                <p>Cargando tipos de usuario...</p>
              ) : (
                <AdminTable columns={columns} data={tipos} actions={actions} />
              )}
            </div>
          </div>
        </div>

        {/* Sidebar completo con todas las rutas */}
        <div className="drawer-side is-drawer-close:overflow-visible z-50">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-[#EBEDF2] is-drawer-close:w-16 is-drawer-open:w-64 is-drawer-open:gap-1">
            <div className="!p-4 is-drawer-close:!hidden is-drawer-open:w-full">
              <h1 className="menu-title">CRUMBLY</h1>
            </div>
            <ul className="menu w-full grow is-drawer-open:!pl-4 is-drawer-open:!pr-4 is-drawer-close:!mt-[4rem]">
              {/* Administradores */}
              <li className="li-sidebar">
                <button
                  className="flex items-center justify-start w-full gap-3 p-3 rounded-md transition-all duration-200
                           is-drawer-close:justify-center is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:gap-1
                           is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Administradores"
                  id="btn-hover"
                  onClick={() => navigate("/private/administradores")}
                >
                  <PersonFill className="is-drawer-close:w-5 is-drawer-close:h-5 is-drawer-open:w-4 is-drawer-open:h-4" />
                  <span className="is-drawer-close:hidden flex-1 text-left pl-2">Administradores</span>
                </button>
              </li>

              {/* Usuarios */}
              <li className="li-sidebar">
                <details className="w-full overflow-visible">
                  <summary
                    className="flex items-center justify-start w-full gap-3 p-3 rounded-md transition-all duration-200 cursor-pointer
                               is-drawer-close:justify-center is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:gap-1
                               is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Usuarios"
                    id="summary-hover"
                  >
                    <PersonFillGear className="is-drawer-close:w-5 is-drawer-close:h-5 is-drawer-open:w-4 is-drawer-open:h-4" />
                    <span className="flex-1 text-left pl-2 is-drawer-close:hidden">Usuarios</span>
                  </summary>
                  <ul className="is-drawer-close:!hidden !pl-2 flex flex-col gap-2">
                    <li className="li-sidebar2">
                      <a onClick={() => navigate("/private/clientes")} id="link-sidebar">Clientes</a>
                    </li>
                    <li className="li-sidebar2">
                      <a onClick={() => navigate("/private/usuarios-locales")} id="link-sidebar">Usuarios locales</a>
                    </li>
                    <li className="li-sidebar2">
                      <a onClick={() => navigate("/private/usuarios-firebase")} id="link-sidebar">Usuarios Firebase</a>
                    </li>
                    <li className="li-sidebar2">
                      <a onClick={() => navigate("/private/niveles-usuario")} id="link-sidebar">Niveles de usuario</a>
                    </li>
                  </ul>
                </details>
              </li>

              {/* Productos */}
              <li className="li-sidebar">
                <details className="w-full overflow-visible">
                  <summary
                    className="flex items-center justify-start w-full gap-3 p-3 rounded-md transition-all duration-200
                               is-drawer-close:justify-center is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:gap-1
                               is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Productos"
                    id="summary-hover"
                  >
                    <BoxSeamFill className="is-drawer-close:w-5 is-drawer-close:h-5 is-drawer-open:w-4 is-drawer-open:h-4" />
                    <span className="flex-1 text-left pl-2 is-drawer-close:hidden">Productos</span>
                  </summary>
                  <ul className="is-drawer-close:!hidden !pl-2 flex flex-col gap-1">
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Productos</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Estado Producto</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Categorias</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Ofertas</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Valoraciones</a></li>
                  </ul>
                </details>
              </li>

              {/* Pedidos */}
              <li className="li-sidebar">
                <details className="w-full overflow-visible">
                  <summary
                    className="flex items-center justify-start w-full gap-3 p-3 rounded-md transition-all duration-200
                               is-drawer-close:justify-center is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:gap-1
                               is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Pedidos"
                    id="summary-hover"
                  >
                    <UiChecks className="is-drawer-close:w-5 is-drawer-close:h-5 is-drawer-open:w-4 is-drawer-open:h-4" />
                    <span className="flex-1 text-left pl-2 is-drawer-close:hidden">Pedidos</span>
                  </summary>
                  <ul className="is-drawer-close:!hidden !pl-2 flex flex-col gap-3">
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Lista de pedidos</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Detalle de Pedidos</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Estado del pedido</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Métodos de pago</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Entrega</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Pagos</a></li>
                  </ul>
                </details>
              </li>

              {/* Ubicaciones */}
              <li className="li-sidebar">
                <details className="w-full overflow-visible">
                  <summary
                    className="flex items-center justify-start w-full gap-3 p-3 rounded-md transition-all duration-200
                               is-drawer-close:justify-center is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:gap-1
                               is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Ubicaciones"
                    id="summary-hover"
                  >
                    <GeoFill className="is-drawer-close:w-5 is-drawer-close:h-5 is-drawer-open:w-4 is-drawer-open:h-4" />
                    <span className="flex-1 text-left pl-2 is-drawer-close:hidden">Ubicaciones</span>
                  </summary>
                  <ul className="is-drawer-close:!hidden !pl-2 flex flex-col gap-3">
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Direcciones</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Departamento</a></li>
                    <li className="li-sidebar2"><a href="#" id="link-sidebar">Municipios</a></li>
                  </ul>
                </details>
              </li>

              {/* Actividad */}
              <li className="li-sidebar">
                <button
                  className="flex items-center justify-start w-full gap-3 p-3 rounded-md transition-all duration-200
                           is-drawer-close:justify-center is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:gap-1
                           is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Actividad"
                  id="btn-hover"
                >
                  <ListNested className="is-drawer-close:w-5 is-drawer-close:h-5 is-drawer-open:w-4 is-drawer-open:h-4" />
                  <span className="is-drawer-close:hidden flex-1 text-left pl-2">Actividad</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal Crear/Editar */}
      <ModalTipoUsuario
        visible={modalVisible}
        modo={modalModo}
        tipo={tipoSeleccionado}
        onClose={() => setModalVisible(false)}
        onSuccess={fetchTipos}
      />
    </>
  );
}

export default NivelesUsuario;
