import { useEffect } from "react";
import useProyecto from "../hooks/useProyecto";
import FormularioColaborador from "./FormularioColaborador";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alert";

const Colaboradores = () => {
  const { obtenerUnProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta} = useProyecto();

  const params = useParams();

  const {email} = colaborador

  useEffect(() => {
    obtenerUnProyecto(params.id);
  }, []);
  if (!proyecto._id) {
    return <Alerta alerta={alerta}/>
  }
  return (
    <>
      <div className="flex items-center justify-center gap-6">
        <h1 className="text-center font-black text-4xl  mb-3 uppercase ">
          añadir Colaborador/a al proyecto: {proyecto.nombre}
        </h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-11 h-11 text-blue-600 mt-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </div>

      <FormularioColaborador />
      {cargando ? (
        <div className="flex justify-center items-center mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 animate-spin "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      ) : (
        colaborador?._id && (
          <div className="px-5 py-10 bg-white mt-16 border-y-8 border-b- rounded-lg text-center">
            <h2 className="text-3xl font-bold">Resultado:</h2>
            <p className="text-center mt-3 mb-4 uppercase font-semibold">
              {colaborador.nombre}
            </p>
            <button className="bg-sky-700 py-3 px-4 rounded-md uppercase font-semibold text-white shadow-lg transition-colors hover:bg-sky-800"
            type="button"
            onClick={()=> agregarColaborador({
              email: email
            })}
            >
              Agregar al proyecto
            </button>
          </div>
        )
      )}
    </>
  );
};

export default Colaboradores;
