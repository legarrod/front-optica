import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import getDate from "../../../utils/utils";

export default function FormRegCita({ setOpen, cedulaPaciente,  getDataEvent }) {
  let hoy = new Date();
  const url = `${process.env.API_REGISTRAR_NUEVA_CITA}`;
  const urlConsultarPaciente = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
  const [fecha, setFecha] = useState();
  const [data, setData] = useState();
  const [idPaciente, setIdPaciente] = useState();
  const [horaCita, setHoraCita] = useState();
  const hora = ['09:00 am', '09:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '01:00 pm', '01:30 pm', '02:00 pm', '02:30 pm', '03:00 pm', '03:30 pm', '04:00 pm', '04:30 pm', '05:00 pm', '05:30 pm']
  
  const { register, handleSubmit } = useForm();
  const [dataResponse, setDataResponse] = useState("");

  const postCita = async (url, formData = null, setDataResponse = null) => {
    try {
      const data = await axios.post(url, formData);
      if (data.data.status_code === 200) {
        setDataResponse(data.data.status_code);
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
          fecha_creacion: getDate(hoy),
          fecha_cita: fecha,
          hora: horaCita,
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

  const handlerSlectHora = (e)=>{
    setHoraCita(e.target.value);
  }

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
      getDataEvent();
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
        <div className="flex flex-wrap mb-2 items-center">
        <p className="text-xl mr-3">Dia de la cita:</p>
        <DayPickerInput style={{border: '1px gray solid'}} onDayChange={day => setFecha(getDate(day))} />
        </div>
        <div>
        <select className="border-2 p-2 bg-white rounded-md text-xl my-3 sm:m-3 w-80" name="hora" ref={register} onClick={(e) => handlerSlectHora(e)}>
				{
					hora?.map(item=>(
						<option value={item}>{item}</option>
					))
				}
			</select>
        </div>
        
      </div>
      
      <input
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}
