import useProyecto from "./useProyecto";
import useAuth from "./useAuth";

export const useAdmin = () => {
  const { proyecto } = useProyecto();
  const { autenticacion } = useAuth();

  return proyecto.creador === autenticacion._id
};
