import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alert";
import clienteAxios from "../config/clienteAxios.js";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const {setAutenticacion} = useAuth();
  const navigate = useNavigate()

  const handeSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    setTimeout(() => {
      setAlerta({});
    }, 3000);

    try {
      const { data } = await clienteAxios.post(`/api/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAutenticacion(data);
      navigate('/proyectos')
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-950 text-5xl font-black text-center mx-auto capitalize">
        Inicia sesión y Administra tus{" "}
        <span className="text-green-500">proyectos</span>
      </h1>

      <form
        action=""
        className="mt-16 flex justify-center items-center mx-auto"
        onSubmit={handeSubmit}
      >
        <fieldset>
          {msg && <Alerta alerta={alerta} />}

          <div className="flex flex-col items-center">

            <label className="font-medium text-sm block" htmlFor="email">
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@example.com"
              className="mt-2 bg-gray-100 rounded-md p-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-md w-64"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center mt-5">
            <label className="font-medium text-sm block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              className="mt-2 bg-gray-100 rounded-md p-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-md w-64"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <input
              className="p-3 mt-6 bg-green-600 rounded-lg text-white font-medium shadow-xl hover:bg-green-500 cursor-pointer transition-colors"
              type="submit"
              value="Iniciar Sesíon"
            />
          </div>
        </fieldset>
      </form>
      <nav className="lg:flex lg:justify-around mt-6 text-sky-900 font-normal">
        <Link to="/registrar" className="text-center block my-2">
          ¿No tienes cuenta? Regístrate
        </Link>
        <Link to="/olvide-password" className="text-center block my-2">
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
