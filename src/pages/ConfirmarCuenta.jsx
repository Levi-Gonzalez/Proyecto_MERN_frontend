import Alert from "../components/Alert";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios.js";

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmar = async () => {
      try {
        const url = `api/confirmar/${token}`;
        const {data} = await clienteAxios(url);
        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg
        })
      }
    };
    confirmar();
  }, []); // Agrega 'token' como dependencia para que useEffect se ejecute cuando cambie

  const {msg} = alerta

  return (
    <>
      <h1 className="capitalize font-bold text-center text-5xl">
        Confirmar Password y crea tus{" "}
        <span className="text-sky-500 mb-60">proyectos</span>
      </h1>

      {msg && <Alert alerta={alerta} />}
      {cuentaConfirmada && (
      <Link className="block text-center my-5 text-indigo-950 uppercase text-sm " to="/">
       ¿Ya tienes cuenta? Inicia Sesión </Link>
      )}
    </>
  );
};

export default ConfirmarCuenta;

/*
      setAlerta({
          msg: data.msg,
          error: false
        })
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });

              <div className="mt-10">{msg && <Alert alerta={alerta} />}</div>
*/
