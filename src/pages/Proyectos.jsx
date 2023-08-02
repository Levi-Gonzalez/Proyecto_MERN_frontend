import PreviewProyecto from "../components/PreviewProyecto";
import useProyecto from "../hooks/useProyecto";
import Alerta from "../components/Alert";
const Proyectos = () => {
  const { proyectos, alerta } = useProyecto();

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-4xl font-black text-center uppercase">Proyectos</h1>
      {msg && <Alerta alerta={alerta} />}
      <div className="bg-white text-lg shadow-md rounded-md mt-10">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="uppercase text-center font-semibold p-5">
            No hay proyectos aún
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
