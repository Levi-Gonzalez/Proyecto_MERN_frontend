import { useEffect, useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

// Variable global para tener acceso a los métodos
let socket;

export const ProyectoContext = createContext();

const ProyectoProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
  const [buscador, setBuscador] = useState(false);

  const {autenticacion} = useAuth()

  const navigate = useNavigate();
  //DATA: es lo que esta guardado en la DB con y lógica de los controladores del BE.
  //Este UsEff se carga al cargar el componente.
  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/proyectos", config);
        //hacemos una copia de los proyectos actuales
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, [autenticacion]);

  useEffect(() => {
    //Está disponible a todas las variables.
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  //async por que interactua con datos de nuestra api
  const submitProyecto = async (proyecto) => {
    /*si existe el id, modifica. Si no existe, lo crea.
    Le agregamos await para que limpie y mande la alerta al mismo tiempo
    */
    if (proyecto.idFormateador) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
    return;
  };

  const obtenerUnProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      };
      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data);
    } catch (error) {
      navigate("/proyectos");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }

    return;
  };

  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.idFormateador}`,
        proyecto,
        config
      );

      //sincronizar el state, y vamos a iterar sobre el state de proyectos y accedemos al state que esta en memoria.
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id
          ? // retorna el que esta en memoria
            data
          : // ≠ id, retorna el objeto del state
            proyectoState
      );

      setProyectos(proyectosActualizados);
    } catch (error) {
      console.log(error);
    }

    setAlerta({
      msg: "Proyecto actualizado correctamente!",
      error: false,
    });
    setTimeout(() => {
      setAlerta({});
      navigate("/proyectos");
    }, 1500);
  };
  const nuevoProyecto = async (proyecto) => {
    //vamos a mandar el req autenticado hacia la ruta para crear proyectos
    try {
      //Por lo gral tiene token para crear proyecto pero hacemos una validacion
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      //copia todos los proyectos, es el que hace que muestre todos los inputs llenos!
      setProyectos([...proyectos, data]);

      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProyecto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

      //sincronizar con el state:
      const proyectoBorrado = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );

      setProyectos(proyectoBorrado);

      setAlerta({
        msg: data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({}), navigate("/proyectos");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    //Cada vez que iniciemos una NUEVA tarea que arranque vacío.
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    tarea?.id ? await editarTarea(tarea) : await crearTarea(tarea);
  };

  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/tareas", tarea, config);

      setModalFormularioTarea(false);
      setAlerta({});

      //SOCKET IO:
      socket.emit("nueva tarea", data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // el id que viene es del useEffect de ModalForm, para identificar la tarea que vamos a editar.
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );
      setAlerta({});
      setModalFormularioTarea(false);
      //SOCKET IO
      socket.emit("actualizar tarea", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const handleEliminar = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setModalEliminarTarea(false);

      //Socket
      socket.emit("eliminar tarea", tarea);

      setTarea({});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/proyectos/colaboradores",
        { email },
        config
      );

      setColaborador(data);
      //para limpiar si hay una noti
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);

      setColaborador({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: colaborador._id },
        config
      );

      const proyectoActualizado = { ...proyecto };

      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );

      setProyecto(proyectoActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setModalEliminarColaborador(false);

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const tareaCompletada = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );

      setTarea({});
      setAlerta({});

      //Socket
      socket.emit("cambiar estado", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  //Socket IO
  const submitTareasProyectos = (tarea) => {
    //agregamos el proyecto al state sin modificar al original.
    const proyectoActualizado = { ...proyecto };
    //tomamos unas copias de las tareas que haya y le agregamos data.
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
    setProyecto(proyectoActualizado);
  };

  const eliminarTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
      (tareaState) => tareaState._id !== tarea._id
    );
    setProyecto(proyectoActualizado);
  };
  const actualizarTareaProyecto = (tarea) => {
    //Para actualizar el DOM > tareas proviene de back.
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas?.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  const cambiarEstadoTarea = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  const cerrarSesionProyectos = () => {
    //lo que se mantiene vivo hay que cerrarlo.
    setProyectos([])
    setProyecto({})
    setAlerta({})
  }

  const { msg } = alerta;

  {
    msg && <Alerta alerta={alerta} />;
  }
  return (
    <ProyectoContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerUnProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        handleModalEliminarTarea,
        modalEliminarTarea,
        handleEliminar,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        tareaCompletada,
        handleBuscador,
        buscador,
        submitTareasProyectos,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
        cerrarSesionProyectos 
      }}
    >
      {children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoProvider;
