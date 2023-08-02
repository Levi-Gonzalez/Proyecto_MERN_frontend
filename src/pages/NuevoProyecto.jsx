import FormularioProyecto from "./FormularioProyecto";

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black text-black text-center">Nuevo Proyecto</h1>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default NuevoProyecto;
