import Alerta from "../components/Alert";
import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/clienteAxios.js";
//implementacion de env.
console.log(import.meta.env.VITE_BACKEND_URL);

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword, alerta].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    setTimeout(() => {
      setAlerta({})
    }, 3000);
    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los Password no coinciden",
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, debe ser mayor a 6 carácteres",
        error: true,
      });
      return;
    }
    setAlerta({});
    //tiene formato obj ya que en postman estabamos usando con formato json.
    try {
      const { data } = await clienteAxios.post(`/api`, {
        nombre,
        password,
        email,
      });

      setAlerta({
        msg: data,
        error: false,
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.mensaje,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-950 text-5xl font-black text-center mx-auto capitalize">
        Crea tu cuenta y Administra tus{" "}
        <span className="text-green-500">proyectos</span>
      </h1>

      <form
        action=""
        className="mt-16 flex justify-center items-center mx-auto"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend className="font-semibold text-2xl mb-3 text-center uppercase">
            Registrar
          </legend>
          {}
          {msg && <Alerta alerta={alerta} />}
          <div className="flex flex-col items-center">
            <label className="font-medium text-sm block" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Ingrese su nombre"
              className="mt-2 bg-gray-100 rounded-md p-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-md"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
          </div>
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              placeholder="Ingrese su password"
              className="mt-2 bg-gray-100 rounded-md p-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex flex-col items-center mt-5">
            <label
              className="font-medium text-sm block"
              htmlFor="confirmar-password"
            >
              Repetir Password
            </label>
            <input
              type="password"
              name="confirmar-password"
              id="confirmar-password"
              placeholder="Repita su password"
              className="mt-2 bg-gray-100 rounded-md p-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-md"
              onChange={(e) => setRepetirPassword(e.target.value)}
              value={repetirPassword}
            />
          </div>
          <div className="flex flex-col items-center mt-6">
            <input
              className="p-3 bg-green-600 rounded-lg text-white font-medium shadow-xl hover:bg-green-500"
              type="submit"
              value="Registrar"
            />
          </div>
        </fieldset>
      </form>

      <nav className="lg:flex lg:justify-around mt-6 text-sky-900 font-normal">
        <Link to="/" className="text-center block my-2">
          ¿Tienes cuenta? Inisia Sesión
        </Link>
        <Link to="/olvide-password" className="text-center block my-2">
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};
export default Registrar;
