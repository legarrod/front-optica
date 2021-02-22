import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { post } from "../../../api/AsyncHttpRequest";
import swal from "sweetalert";


export default function FormRegistroUsuario({ setOpen, setOpenRegCita, setCedulaPaciente, cedulaPaciente }) {
  const url = `${process.env.API_GUARDAR_PACIENTE}`;
  const { register, handleSubmit } = useForm();
  const [dataResponse, setDataResponse] = useState("");

  const onSubmit = (data) => (post(url, data, setDataResponse), setCedulaPaciente(data.cedula));
  
  useEffect(() => {
    if (dataResponse) {
      swal("Exelente", "Paciente creado", "success");
      setOpen(false);
      setOpenRegCita(true);
    }
  }, [dataResponse]);

  return (
    <form
      className="flex flex-wrap justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap justify-center">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="nombre"
          placeholder="Nombre"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="apellidos"
          placeholder="Apellidos"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="cedula"
          value={cedulaPaciente ? cedulaPaciente : "Cedula"}
          placeholder={cedulaPaciente ? cedulaPaciente : "Cedula"}
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="fechanacimiento"
          placeholder="Fecha de Nacimiento"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="celular"
          placeholder="Celular"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="direccion"
          placeholder="Dirección"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="ocupacion"
          placeholder="Ocupación"
          ref={register}
        />
      </div>
      <input
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}
