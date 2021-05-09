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
  const [fecha, setFecha] = useState('');
  const [data, setData] = useState();
  const [idPaciente, setIdPaciente] = useState();
  const [horaCita, setHoraCita] = useState('');
  const hora = ['09:00 am', '09:15 am', '09:30 am', '09:45 am', '10:00 am', '10:15 am', '10:30 am', '10:45 am', '11:00 am', '11:15 am', '11:30 am', '11:45 am', '12:00 pm', '12:15 pm', '12:30 pm', '12:45 pm', '01:00 pm', '01:15 pm', '01:30 pm', '01:45 pm', '02:00 pm', '02:15 pm', '02:30 pm', '02:45 pm', '03:00 pm', '03:15 pm', '03:30 pm', '03:45 pm', '04:00 pm', '04:15 pm', '04:30 pm', '04:45 pm', '05:00 pm', '05:15 pm', '05:30 pm', '05:45 pm']
  const [disabledButton, setDisabledButton] = useState(false)
  const { register, handleSubmit } = useForm();


  const setDataResponse =(data)=>{
 
    if (data.data.data === true) {
      swal("Excelente", "Se ha registrado una nueva cita", "success");
      setOpen(false);
      getDataEvent();
      setDisabledButton(false)
    }
  }

  const postCita = async (url, formData = null) => {
    try {
      const data = await axios.post(url, formData);
      
        setDataResponse(data);
    
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
          lejos_add_derecho: "", 
          lejos_add_izquierdo: "", 
          cerca_add_derecho: "", 
          cerca_add_izquierdo: "",
          cerca_av_derecho: "",
          cerca_av_izquierdo: "",
          cerca_cilindro_derecho: "",
          cerca_cilindro_izquierdo: "",
          cerca_eje_derecho: "",
          cerca_eje_izquierdo: "",
          cerca_esferico_derecho: "",
          cerca_esferico_izquierdo: "",
          lejos_av_derecho: "",
          lejos_av_izquierdo: "",
          lejos_cilindro_derecho: "",
          lejos_cilindro_izquierdo: "",
          lejos_eje_derecho: "",
          lejos_eje_izquierdo: "",
          lejos_esferico_derecho: "",
          lejos_esferico_izquierdo: "",
          valor_cita: "",
          observaciones: ""
      }
      if (
        fecha === "" ||
        horaCita === "" 
      ) {
        swal({
          text: "Por favor complete todos los campos",
          button: {
            text: "De acuerdo!",
          },
          
        });
        setDisabledButton(false);
      } else {
        setDisabledButton(true)
          postCita(url, newData, setDataResponse)
      }
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
  }, []);

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
          defaultValue={data?.nombre}
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
      disabled={disabledButton}
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}
