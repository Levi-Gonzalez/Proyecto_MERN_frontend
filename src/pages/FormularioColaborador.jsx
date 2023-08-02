import { useState } from "react";
import useProyecto from "../hooks/useProyecto";
import Alerta from "../components/Alert";
import { useParams } from "react-router-dom";
const FormularioColaborador = () => {

  

  const [email, setEmail] = useState("");
  const { mostrarAlerta, alerta, submitColaborador } = useProyecto();

  const handletSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    submitColaborador(email)
  };

  const { msg } = alerta;

  return (
    <form
      action=""
      className="bg-white px-5 py-11 rounded-lg mt-5 shadow-2xl shadow-sky-800  mx-auto"
      onSubmit={handletSubmit}
    >
      <div>
        <label
          htmlFor="email"
          className="uppercase text-center block font-medium text-2xl"
        >
          Email
        </label>
        {msg && <Alerta alerta={alerta} />}
        <input
          type="email"
          id="email"
          className="bg-gray-100 rounded-md p-3 w-full text-center mt-5 border-2 border-gray-300 text-lg"
          placeholder="Ingrese colaborador"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          id="email"
          type="submit"
          value="Añadir colaborador"
          className="
            block mx-auto rounded-lg p-4 text-white uppercase text-xl
            transition ease-in-out delay-150 bg-blue-700 hover:-translate-y-1 hover:scale-105
           hover:bg-blue-600 duration-300 mt-10 font-medium cursor-pointer"
        />
      </div>
    </form>
  );
};

export default FormularioColaborador;
