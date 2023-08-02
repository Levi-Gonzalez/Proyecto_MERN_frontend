import { cambioHorario } from "../helpers/Hora";
import { useAdmin } from "../hooks/useAdmin";
import useProyecto from "../hooks/useProyecto";

const Tarea = ({ tareas }) => {
  const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tareas;
  const { handleModalEditarTarea, handleModalEliminarTarea, tareaCompletada } =
    useProyecto();

  const admin = useAdmin();

  return (
    <>
  <div className="xl:flex justify-between border-b mx-8">
        <div className="flex-1  sm:flex-col ">
          <h3 className="mt-2 text-xl my-2 font-semibold">{nombre}</h3>
          <p className="mb-2 font-normal text-gray-500 text-sm">
            {descripcion}
          </p>
          <p className="mb-2 text-sm font-normal">
            {cambioHorario(fechaEntrega)}
          </p>
          <p className="mb-2 text-gray-500 text-sm">Prioridad: {prioridad}</p>
          {estado && (
            <p className="bg-blue-600 text-white rounded-2xl py-1 px-3 inline-block uppercase text-xs">
              Completada por: {tareas.completado.nombre}
            </p>
          )}
        </div>  

        <div className=" flex gap-4 justify-center py-11">
          {admin && (
            <button
              className="bg-sky-700 rounded-lg uppercase font-bold text-white py-2 px-5 hover:shadow-2xl hover:bg-sky-600 transition-colors"
              onClick={() => handleModalEditarTarea(tareas)}
            >
              Editar
            </button>
          )}

          <div>
            <button
              className={`
        ${estado ? "bg-green-600" : "bg-red-700"} 
        rounded-lg uppercase font-bold text-white hover:shadow-2xl focus:bg-green-500 transition-colors py-2 px-5`}
              onClick={() => tareaCompletada(_id)}
            >
              {estado ? "completado" : "incompleto"}
            </button>
          </div>

          {admin && (
            <button
              className="bg-red-700 rounded-lg uppercase font-bold text-white py-3 px-5 hover:shadow-2xl bg hover:bg-red-600 transition-colors"
              onClick={() => handleModalEliminarTarea(tareas)}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Tarea;
