import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { post } from "../../../api/AsyncHttpRequest";
import swal from "sweetalert";

export default function FormRegCita({ setOpen }) {
  const url = `${process.env.API_GUARDAR_PACIENTE}`;
  const { register, handleSubmit } = useForm();
  const [dataResponse, setDataResponse] = useState("");

  const onSubmit = (data) => post(url, data, setDataResponse);
  useEffect(() => {
    if (dataResponse) {
      swal("Exelente", "Paciente creado", "success");
      setOpen(false);
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
      </div>
      <input
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}
