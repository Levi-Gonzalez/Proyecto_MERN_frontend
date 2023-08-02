import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProyecto from "../hooks/useProyecto";
import Alert from "../components/Alert";
import { useParams } from "react-router-dom";

//enum: valores fijos y sea una serie de opciones, se recomienda en mayúscula
const PRIORIDAD = ["Baja", "Media", "Alta"];

const ModalFormularioTarea = () => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [prioridad, setPrioridad] = useState("");

  const {
    modalFormularioTarea,
    handleModalTarea,
    mostrarAlerta,
    alerta,
    submitTarea,
    tarea,
  } = useProyecto();

  useEffect(() => {
    
    if (tarea?._id){
      setId(tarea._id)
      setNombre(tarea.nombre)
      setDescripcion(tarea.descripcion);
      setFechaEntrega(tarea.fechaEntrega?.split("T")[0]);
      setPrioridad(tarea.prioridad);
      return
    }
    //para validar, si no hay nada entonces...
    setId("")
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setPrioridad("");

  }, [tarea]);

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, prioridad].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    await submitTarea({
      //con este id identificamos si estamos editando o creando una tarea
      id,
      nombre,
      descripcion,
      prioridad,
      fechaEntrega,
      proyecto: params.id,
    });

    setId("")
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setPrioridad("");
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
        onClose={handleModalTarea}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalTarea}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414 -1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="leading-6 text-gray-900 text-center font-semibold uppercase text-2xl"
                  >
                    {id 
                    ? 'Editar Tarea'
                    : 'Crear Tarea'
                    }
                  </Dialog.Title>
                  <form
                    action=""
                    className="mt-2 text-center px-12 "
                    onSubmit={handleSubmit}
                  >
                    {msg && <Alert alerta={alerta} />}
                    <div className="my-3 ">
                      <label
                        htmlFor="nombre-proyecto"
                        className="uppercase font-semibold "
                      >
                        Nombre de proyecto
                      </label>
                      <input
                        type="text"
                        id="nombre-proyecto"
                        className=" block mt-5 w-full  p-2 rounded-md border-2 focus:border-blue-400 placeholder:text-center"
                        placeholder="Nombre de la tarea"
                        onChange={(e) => {
                          setNombre(e.target.value);
                        }}
                        value={nombre}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="tarea-descripcion"
                        className="font-semibold uppercase"
                      >
                        Descripcion Tarea
                      </label>
                      <textarea
                        name="tarea-descripcion"
                        id="tarea-descripcion"
                        cols="33"
                        rows="6"
                        className="block mt-3 bg-slate-100 rounded-md  placeholder:text-center mb-4 border-2"
                        placeholder="Descripción de la tarea"
                        onChange={(e) => {
                          setDescripcion(e.target.value);
                        }}
                        value={descripcion}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="fecha-entrega"
                        className="uppercase font-semibold "
                      >
                        Fecha de Entrega
                      </label>
                      <input
                        type="date"
                        id="fecha-entrega"
                        className=" block mt-5 w-full  p-2 rounded-md border-2 focus:border-blue-400 
                        text-center"
                        placeholder="Nombre de la tarea"
                        onChange={(e) => {
                          setFechaEntrega(e.target.value);
                        }}
                        value={fechaEntrega}
                      />
                    </div>

                    <div className="">
                      <label
                        htmlFor="prioridad"
                        className="uppercase font-semibold"
                      >
                        {" "}
                        Prioridad{" "}
                      </label>
                      <select
                        name="prioridad"
                        id="prioridad"
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 focus:border-blue-400 text-center border-2"
                        value={prioridad}
                        onChange={(e) => {
                          setPrioridad(e.target.value);
                        }}
                      >
                        <option> Seleccionar </option>
                        {PRIORIDAD.map((opciones) => (
                          <option key={opciones}>{opciones}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      value={id ? 'Editar Tarea' : 'Crear Tarea'}
                      className="text-center text-sm bg-blue-800 w-full py-3 rounded-md text-white mt-5 font-semibold  hover:bg-blue-900 transition-colors cursor-pointer uppercase shadow-sm"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioTarea;
