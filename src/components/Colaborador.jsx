import useProyecto from "../hooks/useProyecto";

const Colaborador = ({ colaborador }) => {
  
  const { handleModalEliminarColaborador } = useProyecto();
  const { nombre, email } = colaborador;

  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-3">
      <div>
        <h3>{nombre}</h3>
        <p className="text-xs text-gray-700">{email}</p>
      </div>
      <div>
        <button type="button" className="bg-red-600 px-4 py-2 rounded-lg text-white font-semibold uppercase transition-colors hover:bg-red-700 shadow-sm"
        onClick={()=>handleModalEliminarColaborador(colaborador )}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaborador;
