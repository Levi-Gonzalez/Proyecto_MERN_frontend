import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useProyecto from "../hooks/useProyecto";
import Loading from "../components/Loading";
import FormularioModal from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Alerta from "../components/Alert";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import { useAdmin } from "../hooks/useAdmin";
import { io } from "socket.io-client";

const Proyecto = () => {
  const {
    obtenerUnProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    alerta,
    submitTareasProyectos,
    eliminarTareaProyecto,
    actualizarTareaProyecto,
    cambiarEstadoTarea,
  } = useProyecto();
  const params = useParams();
  const { id } = params;
  const { nombre, tareas } = proyecto;
  const admin = useAdmin();


  useEffect(() => {
    obtenerUnProyecto(params.id);
  }, []);


  useEffect(() => {
    let socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", id);

    socket.on("tarea agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyectos(tareaNueva);
      }
    });

    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada);
      }
    });

    socket.on("tarea actualizada", (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada);
      }
    });

    socket.on("nuevo estado", (nuevoEstadoTarea) => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea);
      }
    });


  }, []);

  //______________________
 
  const { msg } = alerta;

  return cargando ? (
    <Loading />
  ) : (
    <>
      <div className="font-black text-4xl flex justify-between ">
        <h1>{nombre}</h1>
        <Link to={`/proyectos/editar/${id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 hover:text-purple-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </div>
      <button
        type="button"
        className="bg-blue-700 px-3 py-3 rounded text-white 
        font-bold uppercase mt-5 flex gap-3 hover:shadow-xl justify-items-center justify-center
        w-full xl:w-auto hover:bg-blue-800
        "
        onClick={handleModalTarea}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Nueva terea
      </button>

      <h4 className="text-center my-5 uppercase font-bold">Tareas</h4>

      <div className=" flex justify-center">
        <div className="md:w-full lg:w-96">
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>

      <div className="bg-white p-3 mt-10 rounded-r-lg text-center font-semibold ">
        {" "}
        {tareas?.length ? (
          tareas?.map((tareas) => <Tarea key={tareas._id} tareas={tareas} />)
        ) : (
          <p>No existen tareas</p>
        )}
      </div>
      {admin && (
        <div className="flex items-center justify-between mt-10 ">
          <h4 className="text-xl uppercase font-semibold">Colaboradores</h4>
          <Link
            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className="font-semibold  hover:text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 hover:text-indigo-800 transition-colors hover:scale-105"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </Link>
        </div>
      )}
      {admin && (
        <div className="bg-white py-5 px-10 justify-center mt-5 rounded-md ">
          {proyecto.colaboradores?.length ? (
            proyecto.colaboradores?.map((colaborador) => (
              <Colaborador key={colaborador._id} colaborador={colaborador} />
            ))
          ) : (
            <p className=" p-1 text-center font-semibold">
              No hay colaboradores en este proyecto
            </p>
          )}
        </div>
      )}
      {!admin && (
        <h3 className="text-center mt-4 font-semibold uppercase">
          Rol: Colaborador
        </h3>
      )}

      <ModalEliminarColaborador />
      <FormularioModal />
      <ModalEliminarTarea />
    </>
  );
};

export default Proyecto;
