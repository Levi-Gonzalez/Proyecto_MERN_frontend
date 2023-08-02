export const cambioHorario = (hora) => {
  //con esto quitamos el error de por defecto se ponga jueves y arreglamos la fecha correcta
  const nuevaFecha = new Date(hora.split("T")[0].split("-"));

  const config = {
    //nombre del dia | aparecera completo
    weekday: "long",
    day: "numeric",
    //año: completo
    year: "numeric",
    //mes | aparecera complto
    month: "long",
  };

  return nuevaFecha.toLocaleDateString("es-ES", config);
};
