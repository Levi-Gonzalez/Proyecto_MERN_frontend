import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { autenticacion } = useAuth();
  return (
    <aside className="md:1/3 lg:w-72 py-8 px-8">
      <p className="font-bold text-xl mb-4">Hola, {autenticacion.nombre}</p>

      <Link
        to={"crear-proyecto"}
        className=" bg-indigo-600 p-2 absolute rounded-md text-white hover:bg-indigo-700 hover:shadow-2xl font-semibold shadow-lg px-8 uppercase text-center 
        xs: w-5/6 
        sm:w-1/5 
        md:1/3
        xl:w-1/6
        
        
        "
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
