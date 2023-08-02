import { useContext } from "react";
import { ProyectoContext } from "../context/ProyectoProvider";

const useProyecto = () => {
  return useContext(ProyectoContext);
};

export default useProyecto;
