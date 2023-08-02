import { useState, useEffect } from "react";
import useProyecto from "../hooks/useProyecto";
import Alerta from "../components/Alert";
import { useParams } from "react-router-dom";

const FormularioProyecto = () => {
  
  const [nombre, setNombre] = useState("");
  const [description, setdescription] = useState("");
  const [fechaEntrega, setfechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");
  //este state surge porque el id vive en el context y seguira viviendo pero pudimos solucionar localmente
  const [idFormateador, setIdFormateador] = useState(null);

  const { id } = useParams();

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyecto();

  useEffect(() => {
    //Si existe un ID y uno de estos campos para cambiar entonces será posible modificar la nota

    // '? encadenamiento opcional' : comprueba si existe, si no existe no marca error 
    if (id) {
      //guarda el id de mongo. (Demuestra que no esta vacío y tiene 1 valor)
      setIdFormateador(proyecto._id)
      setNombre(proyecto.nombre);
      setdescription(proyecto.description);
      setfechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
      setCliente(proyecto.cliente);
    }
  }, [proyecto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes acceder a los estados correctamente
    if ([nombre, description, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    //Pasar los datos al provider, como tiene un unico parametro pasamos todo como obj

    //enviamos el id 
    await submitProyecto({idFormateador, nombre, description, fechaEntrega, cliente });
    
    //resetear este id para que sepa cuando creamos el proyecto (null) o cuando lo estamos actualizando. (se le asigna un)
    setIdFormateador(null)
    //Una vez creada se limpiara el form
    setNombre("");
    setdescription("");
    setfechaEntrega("");
    setCliente("");
  };

  const { msg } = alerta;

  return (
    <form
      className="lg:bg-white py-10 px-5 md:w- w-4/6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        {msg && <Alerta alerta={alerta} />}
        <label
          htmlFor="nombre-proyecto"
          className="text-gray-700 uppercase font-bold text-sm flex justify-center"
        >
          Nombre Proyecto
        </label>
        <input
          type="text"
          name="nombre-proyecto"
          id="nombre-proyecto"
          placeholder="Nombre del proyecto"
          className="placeholder: text-center rounded-md border-gray-300 my-2 w-full border py-1"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description-proyecto"
          className="text-gray-700 uppercase font-bold text-sm flex justify-center"
        >
          Proyecto
        </label>
        <textarea
          name="description"
          id="description-proyecto"
          cols="30"
          rows="10"
          className="rounded-md bg-green-200 w-full mt-3 placeholder:text-base "
          placeholder="description del proyecto..."
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-5">
        <div className="mb-5">
          <label
            htmlFor="fecha-entrega"
            className="flex justify-center mb-3 uppercase font-medium text-gray-700"
          >
            Fecha de entrega
          </label>
          <input
            type="date"
            name="fecha-entrega"
            id="fecha-entrega"
            className="font-medium w-full text-center py-2 cursor-pointer"
            value={fechaEntrega}
            onChange={(e) => {
              setfechaEntrega(e.target.value);
            }}
          />                                                              
        </div>
        <div className="mb-5 text-center">
          <label htmlFor="cliente" className="flex justify-center">
            Cliente
          </label>
          <input
            type="text"
            name="cliente"
            id="cliente"
            className="rounded-lg p-1.5 w-full placeholder: text-center border "
            placeholder="Nombre de cliente"
            value={cliente}
            onChange={(e) => {
              setCliente(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="justify-center flex my-3">
        <input
          type="submit"
          //Si existe el id de mongo actualiza si no existe null. 
          value={idFormateador ? 'Actualizar Proyecto' : 'Crear Proyecto'}
          className="bg-sky-700 text-white py-3 px-20 rounded-md  cursor-pointer font-bold hover:bg-sky-800 transition-colors uppercase"
        />
      </div>
    </form>
  );
};

export default FormularioProyecto;
