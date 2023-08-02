import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alert";
import clienteAxios  from "../config/clienteAxios.js";
console.log(import.meta.env.VITE_BACKEND_URL);

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/api/olvide-password`, { email });

      setAlerta({
        msg: data.msg,
        error: false,
      });
      return;
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
        Recupera tu acceso y no pierdas tus{" "}
        <span className="text-green-500">proyectos</span>
      </h1>

      <form
        action=""
        className="mt-16 flex justify-center items-center mx-auto"
        onSubmit={handleSubmit}
      >
        <fieldset>
          {msg && <Alerta alerta={alerta} />}

          <div className="flex flex-col items-center mt-5">
            <label className="font-medium text-sm block" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@example.com"
              className="mt-2 bg-gray-100 rounded-md p-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center mt-6">
            <input
              className="p-3 bg-sky-900 rounded-lg text-white font-medium shadow-xl hover:bg-sky-950"
              type="submit"
              value="Enviar Instrucciones"
            />
          </div>
        </fieldset>
      </form>
      <nav className="lg:flex lg:justify-around mt-6 text-sky-900 font-normal">
        <Link to="/" className="text-center block my-2">
          ¿Tienes cuenta? Inicia Sesión
        </Link>
        <Link to="/registrar" className="text-center block my-2">
          ¿No tienes cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
