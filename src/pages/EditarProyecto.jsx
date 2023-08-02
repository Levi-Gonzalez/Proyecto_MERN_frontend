import useProyecto from "../hooks/useProyecto";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioProyecto from "./FormularioProyecto";

const EditarProyecto = () => {
  const params = useParams();
  const { id } = params;
  const { proyecto, obtenerUnProyecto, eliminarProyecto } = useProyecto();
  const { nombre } = proyecto;

  useEffect(() => {
    obtenerUnProyecto(id);
  }, []);

  const handeDelete = () => {
    if (confirm("Desea Eliminar el proyecto?")) {
      eliminarProyecto(id);
    } else {
      console.log("NO");
    }
  };

  return (
    <>
      <div className="font-black text-4xl flex justify-between">
        <h1 className="text-4xl font-black text-center flex-1">
          Editar Proyecto: <span>"{nombre}"</span>
        </h1>
        <button
          className="text-base font-semibold flex items-center  text-gray-600 hover:text-red-800"
          onClick={handeDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Eliminar
        </button>
      </div>
      <div className="mt-8 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default EditarProyecto;
