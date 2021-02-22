import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { post } from "../../../api/AsyncHttpRequest";
import swal from "sweetalert";
import axios from "axios";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default function FormRegCita({ setOpen, cedulaPaciente }) {
  const url = `${process.env.API_REGISTRAR_NUEVA_CITA}`;
  const urlConsultarPaciente = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
  const [fecha, setFecha] = useState();
  const [data, setData] = useState();
  const [idPaciente, setIdPaciente] = useState();
  
  const { register, handleSubmit } = useForm();
  const [dataResponse, setDataResponse] = useState("");

  const postCita = async (url, formData = null, setDataResponse = null) => {
    console.log(url);
    console.log(formData);
    try {
      const data = await axios.post(url, formData);
      console.log(data);
      if (data.data === "Paciente agregado correctamente") {
        setDataResponse(data.statusText);
      }
    } catch (error) {
      console.log(error);
    }
    //return axios.post(url, formData, config);
  };

  const onSubmit = (data) => {
    
    let newData = {
          fk_id_paciente: parseInt(idPaciente),
          nombre_doctor: 1,
          fk_id_sede: 1,
          fk_id_estado: "",
          fecha_creacion: "2015-02-11",
          fecha_cita: "",
          anamnesis: "",
          biomicrodcopia: "",
          od_rx_uso: "",
          oi_rx_uso: "",
          oi_ap: "",
          oi_af: "",
          od_ap: "",
          od_af: "",
          od_avvlsc: "",
          od_avvpsc: "",
          od_avccvt: "",
          od_avccvp: "",
          od_refraccion: "",
          od_rx_final: "",
          oi_avvlsc: "",
          oi_avvpsc: "",
          oi_avccvt: "",
          oi_avccvp: "",
          oi_refraccion: "",
          oi_rx_final: "",
          valor_cita: "",
          observaciones: ""
      }
    postCita(url, newData, setDataResponse)
  };

  const obtenerPaciente = async (urlConsultarPaciente, cedulaPaciente, setData) => {
    let urlN = `${urlConsultarPaciente}/${cedulaPaciente}`
    try {
      const { data } = await axios.get(urlN);
      
      if (data) {
        setData(data);
        setIdPaciente(data.id)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    obtenerPaciente(urlConsultarPaciente, cedulaPaciente, setData)
    if (dataResponse) {
      swal("Exelente", "Se ha registrado una nueva cita", "success");
      setOpen(false);
    }
  }, [dataResponse]);
console.log( getMonth(fecha));
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
          value={data?.nombre}
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="apellidos"
          placeholder="Apellidos"
          value={data?.apellidos}
          ref={register}
        />
        <div className="">
        <p className="text-xl">Dia de la cita:</p>
        <DayPickerInput onDayChange={day => setFecha(day)} />
      </div>
      </div>
      
      <input
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}
