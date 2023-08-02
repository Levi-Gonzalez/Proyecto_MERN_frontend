import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alert";
import clienteAxios from "../config/clienteAxios.js";


const NuevoPassword = () => {
  const params = useParams();
  const { token } = params;
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `api/olvide-password/${token}`;
        await clienteAxios(url);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handletSubmit = async (e) => {
    e.preventDefault();

    if (password === "") {
      setAlerta({
        msg: "El campo no puede estar vacío",
        error: true,
      });
    } else if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
    } else {
      try {
        const url = `/api/olvide-password/${token}`;
        const { data } = await clienteAxios.post(url, { password });
        setNuevoPassword({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }

    // Limpiar el mensaje de error después de 3 segundos
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const { msg, error } = alerta;

  return (
    <>
      <h1 className="sm:text-center font-bold text-5xl text-sky-950 mx-auto  ">
        tu password y no pierdas acceso a tus{" "}
        <span className="text-green-600">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          action=""
          className="mt-16  justify-center items-center mx-auto"
          onSubmit={handletSubmit}
        >
          <div className="flex flex-col items-center">
            <label className="font-medium text-sm block" htmlFor="nuevoPassword">
              Nuevo Password
            </label>
            <input
              type="password"
              name="Password"
              id="nuevoPassword"
              placeholder="Escribe tu nuevo password"
              className="mt-2 bg-gray-100 rounded-md p-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-md w-64"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <input
              className="p-3 mt-6 bg-green-600 rounded-lg text-white font-medium shadow-xl hover:bg-green-500 cursor-pointer transition-colors"
              type="submit"
              value="Guardar Nuevo Password"
            />
          </div>
          {nuevoPassword && (
            <Link to={"/"}>
              <div className="block text-center m-5 font-semibold hover:text-indigo-700">
                Inicia Sesión
              </div>
            </Link>
          )}
        </form>
      )}
    </>
  );
};

export default NuevoPassword;
