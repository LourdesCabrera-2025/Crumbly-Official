import "../../styles/private/dashboard.css";
import {
  Search,
  MoonFill,
  BellFill,
  PencilSquare,
  GearWideConnected,
  ChevronDown,
  Headset,
  BoxArrowRight,
  PersonFillGear
} from "react-bootstrap-icons";

export function DashboardAdmin() {
  return (
    <>
      <div className="drawer lg:drawer-open fixed top-0 left-0 ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <nav className="navbar w-full flex justify-between  px-4" id="navbar-dashboard">
            <div className="w-50 flex items-center ">
              <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost" id="icon-sidebar">
                {/* Sidebar toggle icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
              </label>
              <div className="px-4" id="title-dashboard">CRUMBLY</div>

            </div>

            <div className="grow"></div>
            <label htmlFor="input" id="input-container" className="max-w-lg w-full relative mx-4">

              <Search className="absolute left-[1rem] top-1/2 -translate-y-1/2 h-5 opacity-50 pointer-events-none z-60" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-60 pointer-events-none z-60">
                <kbd className="kbd kbd-sm ">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
              </div>

              <input type="search" className="grow !pl-10 input input-bordered w-full  pr-16" placeholder="Search" id="input" />
            </label>
            <div className="grow"></div>
            <button id="container-options-dashboard" className="btn btn-ghost">
              <MoonFill className="absolute" />
            </button>
            <div className="indicator">
              <span className="indicator-item badge badge-secondary !m-3 !mr-8 w-[2rem]">15</span>

              <button id="container-notify-dashboard" className="btn btn-ghost relative">
                <BellFill />
              </button>
            </div>
            <div className="dropdown dropdown-end flex items-center group">

              <div tabIndex={0} className="flex items-center cursor-pointer">
                <button
                  id="container-profile-dashboard"
                  className="btn btn-ghost btn-circle avatar"
                >
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
                className="menu dropdown-content bg-base-100 rounded-xl shadow-lg w-60 p-3 z-[900]" id="options-profile">
                <div className=" px-2 pt-2">
                  <p className="font-semibold text-lg" id="username">Cregan</p>
                  <div className="!pb-4 mb-4">
                    <p className="text-sm text-gray-500" id="email">cregan@pimjo.com</p>
                  </div>
                </div>
                <li className="li-option-profile">
                  <a className="flex gap-3 items-start py-3  rounder-lg" id="a-option-profile">
                    <PencilSquare className="text-lg" />
                    Editar perfil
                  </a>
                </li>
                <li className="li-option-profile">
                  <a className="flex gap-3 items-start py-3  rounded-lg" id="a-option-profile">
                    <GearWideConnected className="text-lg" />
                    Configuración de cuenta
                  </a>
                </li>
                <li className="li-option-profile border-b border-gray-500/30 !pb-3">
                  <a className="flex gap-3 items-start py-3 rounded-lg" id="a-option-profile">
                    <Headset className="text-lg" />
                    Soporte técnico
                  </a>
                </li>
                <li className="li-option-profile">
                  <a className="flex gap-3 items-start py-3 rounded-lg text-error" id="a-option-profile">
                    <BoxArrowRight className="text-lg" />
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </div>

          </nav>
          {/* Page content here */}
          <div className="!p-4">
              div
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64" id="sidebar">
            {/* Sidebar content here */}
            <ul className="menu w-full grow" id="ul-sidebar">
              <li className="li-sidebar ">
                <button className="flex items-center justify-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right w-full is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:justify-center is-drawer-close:gap-1" data-tip="Administradores">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="my-1.7 inline-block size-5"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M5.5 21a7 7 0 0 1 13 0" />
                  </svg>
                  <span className="is-drawer-close:hidden">Administradores</span>
                </button>
              </li>
              <li className="li-sidebar">
                <details className="w-full">
                  <summary
                    className="flex items-center justify-center gap-3 is-drawer-close:tooltip is-drawe-close:tooltip-right w-full is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:justify-center is-drawer-close:gap-1" data-tip="Usuarios">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="my-1.5 inline-block size-5"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="7" r="4" />
                      <path d="M5.5 21a7 7 0 0 1 13 0" />
                    </svg>
                    <span className="is-drawer-close:hidden">Usuarios</span>
                  </summary>
                  <ul className="is-drawer-close:hidden">
                    <li className="li-sidebar "><a href="#" className="w-full justify-center">Clientes</a></li>
                    <li className="li-sidebar"><a href="#" className="w-full justify-center">Usuarios locales</a></li>
                    <li className="li-sidebar"><a href="#" className="w-full justify-center">Usuarios Firebase</a></li>
                  </ul>
                </details>
              </li>

              <li className="li-sidebar">
                <details className="w-full">
                  <summary className="flex items-center justify-center gap-3 is-drawer-close:tooltip is-drawe-close:tooltip-right w-full is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:justify-center is-drawer-close:gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="my-1.5 inline-block size-5"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7h18l-1.5 12h-15z" />
                      <path d="M10 11v6m4-6v6" />
                    </svg>
                    <span className="is-drawer-close:hidden">Productos</span>
                  </summary>
                  <ul className="is-drawer-close:hidden">
                    <li className="li-sidebar "><a href="#" className="w-full justify-center">Categorias</a></li>
                    <li className="li-sidebar"><a href="#" className="w-full justify-center">Ofertas</a></li>
                    <li className="li-sidebar"><a href="#" className="w-full justify-center">Valoraciones</a></li>
                  </ul>
                </details>
              </li>
              <li className="li-sidebar">
                <details className="w-full">
                  <summary className="flex items-center justify-center gap-3 is-drawer-close:tooltip is-drawe-close:tooltip-right w-full is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:justify-center is-drawer-close:gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="my-1.5 inline-block size-5"
                      fill="none" stroke="currentColor"
                      viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M3 3h18M3 10h18M3 17h18" />
                    </svg>
                    <span className="is-drawer-close:hidden">Pedidos</span>
                  </summary>
                  <ul className="is-drawer-close:hidden">
                    <li className="li-sidebar "><a href="#" className="w-full justify-center">Lista de pedidos</a></li>
                    <li className="li-sidebar"><a href="#" className="w-full justify-center">Estado del pedido</a></li>
                    <li className="li-sidebar"><a href="#" className="w-full justify-center">Métodos de pago</a></li>
                    <li className="li-sidebar"><a href="#" className="w-full justify-center">Entrega</a></li>
                    <li className="li-sidebar"><a href="#" className="w-full justify-center">Pagos</a></li>
                  </ul>
                </details>
              </li>
              <li className="li-sidebar">
                <button className="flex items-center justify-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right w-full is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:justify-center is-drawer-close:gap-1" 
                  data-tip="Direcciones"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="my-1.5 inline-block size-5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M12 22s8-4 8-12a8 8 0 1 0-16 0c0 8 8 12 8 12z" />
                  </svg>
                  <span className="is-drawer-close:hidden">Direcciones</span>
                </button>
              </li>
              <li className="li-sidebar">
                <button
                  className="flex items-center justify-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right w-full is-drawer-close:flex-col is-drawer-close:items-center is-drawer-close:justify-center is-drawer-close:gap-1" 
                  data-tip = "Logs de Acciones"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="my-1.5 inline-block size-5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M7 7h10M7 12h4" />
                  </svg>
                  <span className="is-drawer-close:hidden">Log de acciones</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </>
  )
}

export default DashboardAdmin