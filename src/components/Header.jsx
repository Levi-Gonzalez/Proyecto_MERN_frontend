import { Link } from "react-router-dom";
import useProyecto from "../hooks/useProyecto";
import Busqueda from "./Busqueda";
import useAuth from "../hooks/useAuth"
const Header = () => {
  const { handleBuscador, cerrarSesionProyectos, } = useProyecto();
  const{cerrarSesionAuth} = useAuth()

  const handleCerrarSesiones = () => {
     cerrarSesionAuth()
     cerrarSesionProyectos()
     localStorage.removeItem("token")
  }

  return (
    
    <header className="px-4 py-5 border-b flex flex-wrap justify-between items-center ">
      <h2 className="sm: text-3xl font-black text-indigo-700 w-full md:w-auto sm: block text-center mb-4">
        B-Notes
      </h2>

      <div className="ml-4 hover:skew-y-3">
        <Link to="/proyectos" className="text-emerald-600 font-bold text-2xl">
          Proyectos
        </Link>
      </div>

      <div className="ml-4 flex flex-wrap">
        <input
          type="search"
          placeholder="Buscar proyecto"
          className="rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-blue-800 xs:w-full mr-5 md:w-auto "
        />
        <button
          type="button"
          className="px-2 py-2 uppercase text-black font-medium border-y-2 border-teal-900 rounded-lg bg-transparent"
          onClick={handleBuscador}
        >
          Buscar
        </button>
      </div>

      <button
        type="button"
        className="font-medium text-white bg-red-500 hover:bg-red-600 rounded-md px-2 py-2 shadow-md xs:w-1/2  mt-4 lg:1/4 xl:w-36 "
        onClick={handleCerrarSesiones}
      >
        Cerrar Sesión
      </button>
      <Busqueda/>
    </header>
  );
};

export default Header;
