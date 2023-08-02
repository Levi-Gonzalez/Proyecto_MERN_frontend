const Alerta = ({ alerta }) => {
  
  const alertClassName = alerta.error
    ? "from-red-500 to-red-700 p-3 rounded-lg text-white font-semibold my-3 bg-gradient-to-t text-center text-center "
    : "from-blue-500 to-blue-800 p-3 rounded-lg text-white font-medium my-3 bg-gradient-to-tl text-center";

  return (
    <div className={alertClassName}> 
      {alerta.msg}
    </div>
  )
};

export default Alerta;
