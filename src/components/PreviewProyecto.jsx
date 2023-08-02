import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  const { nombre, _id, cliente, creador } = proyecto;
  

  const { autenticacion } = useAuth();
  return (
    <div className="flex p-3 border-b font-medium items-center">
      <p className="flex-1"> {nombre}<span className="text-gray-500 text-sm"> {cliente}</span>
      </p>
      {autenticacion._id !== creador && (
          <p className="uppercase text-xs text-white bg-green-600 rounded-full px-4 py-1 ">
            colaborador
          </p>
      )}
      <Link
        to={`/proyectos/${_id}`}
        className="ml-2 uppercase text-sky-800 hover:text-blue-400"
      >
        ver proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
