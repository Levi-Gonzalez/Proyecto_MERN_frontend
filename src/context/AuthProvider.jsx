import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [autenticacion, setAutenticacion] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const autenticar = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        //para que en otros nav no se quede colgando entonces los redirige al inicio.
        setCargando(false)
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        //Va a esta url, revisa la config y si el token es válido le va asignar al req.usuario del checkAuth y vamos a obtener los datos para el perfil.
        const { data } = await clienteAxios(`/api/perfil`, config);
        setAutenticacion(data);
        //Si el usuario esta autenticado correctamente y llegamos a esta linea no tendra que logearse de nuevo entonces la app lo redirige a proyectos:
        navigate('/proyectos')
      } catch (error) {
        // En caso de que haya algo previamente y despues expire el token entonces lo regresarenis
        setAutenticacion({})
        }
        setCargando(false);
    };
    autenticar();
  }, []);

  const cerrarSesionAuth = () => {
    setAutenticacion({})
  }

  return (
    <AuthContext.Provider
      value={{
        autenticacion,
        setAutenticacion,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
