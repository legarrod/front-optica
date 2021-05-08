import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import BlockIcon from "@material-ui/icons/Block";
import { useForm } from "react-hook-form";
import getDate from '../../../utils/utils'
import { put} from '../../../api/AsyncHttpRequest'
import swal from "sweetalert";
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function index(allData) {
  let informacionCita = allData?.allData;
  const url = `${process.env.API_ACTUALIZAR_CITA}/`;
const [disbledButton, setDisbledButton] = useState(false)
  const classes = useStyles();
  let hoy = new Date();
  const { register, handleSubmit } = useForm();

  const defaultInfo = {
    nombre_doctor: 1,
    fk_id_sede: 1,
    fecha_creacion: getDate(hoy),
    fecha_cita: getDate(hoy), 
    fk_id_paciente: parseInt(allData?.allData?.fk_id_paciente),
    id_cita_paciente: parseInt(allData?.allData?.id_cita_paciente)
  }

  const setDataResponse = (data)=>{
    if (data?.data) {
      setDisbledButton(false)
      swal("Excelente", "Cita Actualizada con exito!", "success")
    }
  }

  const onSubmit = (data) =>{
    setDisbledButton(true)
    put(url, Object.assign(data, defaultInfo), setDataResponse)
  }
 
  return (
    <div className="border-2 rounded-lg border-gray-300 p-2 mx-2 md:m-5">
      <p className="text-2xl text-center mb-3">Cuadro clínico</p>
      <form
      className="flex flex-wrap justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
     {/* -------------------------------------------------------------- */}
     <div className="hidden sm:flex sm:flex-col">
          <div className="flex flex-row justify-center items-center">
          <p className="text-lg mr-3 text-black uppercase transform hidden sm:block -rotate-90 sm:rotate-0">Lejos</p>
            <div className="m-0 flex flex-col justify-end ">
            <p className="text-black text-xl font-semibold text-center uppercase">OJO</p>
              <input
              disabled
                className="border-2 text-black w-32 border-white text-center m-1 text-lg p-1"
                placeholder="Derecho"
              />          
              <input
              disabled
                className="border-2 text-black w-32 border-white text-center m-1 text-lg p-1"
                placeholder="Izquierdo"
              />
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
        <p className="text-lg mr-3 text-black transform hidden sm:block -rotate-90 sm:rotate-0 uppercase">Cerca</p>
          <div className="m-0 flex flex-col justify-end"> 
            <input
            disabled
                className="border-2 text-black w-32 border-white text-center m-1 text-lg p-1"
                placeholder="Derecho"
              />
            <input
            disabled
              className="border-2 text-black w-32 border-white text-center m-1 text-lg p-1"
              placeholder="Izquierdo"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
        <p className="text-lg m-0 text-black transform hidden sm:block -rotate-90 sm:rotate-0 uppercase">Actual</p>
          <div className="m-0 flex flex-col justify-end"> 
            <input
            disabled
              className="border-2 text-black w-32 border-white text-center m-1 text-lg p-1"
              placeholder="Derecho"
            />
    
            <input
            disabled
              className="border-2 text-black w-32 border-white text-center m-1 text-lg p-1"
              placeholder="Izquierdo"
            />
          </div>

        </div>
      </div>

        {/* -------------------------------------------------------------- */}
        {/* -------------------------------------------------------------- */}
      <div className="flex flex-col">
          <div className="flex flex-row justify-center items-center">
             <p className="text-lg mr-3 text-black uppercase block sm:hidden">Lejos</p>
            <div className="m-0 flex flex-col justify-end ">
            <p className="text-black text-xl font-semibold text-center uppercase">Esferico</p>
              <input
              tabindex="1"
              autoFocus
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="lejos_esferico_derecho"
                defaultValue={informacionCita?.lejos_esferico_derecho}
                placeholder="Derecho"
                ref={register}
              />          
              <input
              tabindex="5"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="lejos_esferico_izquierdo"
                defaultValue={informacionCita?.lejos_esferico_izquierdo}
                placeholder="Izquierdo"
                ref={register}
              />
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="text-lg mr-3 text-black block sm:hidden uppercase">Cerca</p> 
          <div className="m-0 flex flex-col justify-end"> 
            <input
            tabindex="9"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="cerca_esferico_derecho"
                defaultValue={informacionCita?.cerca_esferico_derecho}
                placeholder="Derecho"
                ref={register}
              />
            <input
            tabindex="13"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="cerca_esferico_izquierdo"
              defaultValue={informacionCita?.cerca_esferico_izquierdo}
              placeholder="Izquierdo"
              ref={register}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
         <p className="text-lg m-0 text-black block sm:hidden uppercase">Actual</p> 
          <div className="m-0 flex flex-col justify-end"> 
            <input
            tabindex="17"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="actual_esferico_derecho"
              defaultValue={informacionCita?.actual_esferico_derecho}
              placeholder="Derecho"
              ref={register}
            />
    
            <input
            tabindex="21"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="actual_esferico_izquierdo"
              defaultValue={informacionCita?.actual_esferico_izquierdo}
              placeholder="Izquierdo"
              ref={register}
            />
          </div>

        </div>
      </div>

        {/* -------------------------------------------------------------- */}

      

       {/* -------------------------------------------------------------- */}
      <div className="flex flex-col">
          <div className="flex flex-row justify-center items-center">
 <p className="text-lg mr-3 text-black uppercase block sm:hidden">Lejos</p>
            <div className="m-0 flex flex-col justify-end ">
            <p className="text-black text-xl font-semibold text-center uppercase">Cilindro</p>
              <input
              tabindex="2"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="lejos_cilindro_derecho"
                defaultValue={informacionCita?.lejos_cilindro_derecho}
                placeholder="Derecho"
                ref={register}
              />          
              <input
              tabindex="6"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="lejos_cilindro_izquierdo"
                defaultValue={informacionCita?.lejos_cilindro_izquierdo}
                placeholder="Izquierdo"
                ref={register}
              />
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
   <p className="text-lg mr-3 text-black block sm:hidden uppercase">Cerca</p> 
          <div className="m-0 flex flex-col justify-end"> 
            <input
            tabindex="10"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="cerca_cilindro_derecho"
                defaultValue={informacionCita?.cerca_cilindro_derecho}
                placeholder="Derecho"
                ref={register}
              />
            <input
            tabindex="14"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="cerca_cilindro_izquierdo"
              defaultValue={informacionCita?.cerca_cilindro_izquierdo}
              placeholder="Izquierdo"
              ref={register}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
         <p className="text-lg m-0 text-black block sm:hidden uppercase">Actual</p>  
          <div className="m-0 flex flex-col justify-end"> 
            <input
            tabindex="18"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="actual_cilindro_derecho"
              defaultValue={informacionCita?.actual_cilindro_derecho}
              placeholder="Derecho"
              ref={register}
            />
    
            <input
            tabindex="22"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="actual_cilindro_izquierdo"
              defaultValue={informacionCita?.actual_cilindro_izquierdo}
              placeholder="Izquierdo"
              ref={register}
            />
          </div>

        </div>
      </div>

        {/* -------------------------------------------------------------- */}
        {/* -------------------------------------------------------------- */}
      <div className="flex flex-col">
          <div className="flex flex-row justify-center items-center">
            <p className="text-lg mr-3 text-black uppercase block sm:hidden">Lejos</p>
            <div className="m-0 flex flex-col justify-end ">
            <p className="text-black text-xl font-semibold text-center uppercase">Eje</p>
              <input
              tabindex="3"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="lejos_eje_derecho"
                defaultValue={informacionCita?.lejos_eje_derecho}
                placeholder="Derecho"
                ref={register}
              />          
              <input
              tabindex="7"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="lejos_eje_izquierdo"
                defaultValue={informacionCita?.lejos_eje_izquierdo}
                placeholder="Izquierdo"
                ref={register}
              />
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
   <p className="text-lg mr-3 text-black block sm:hidden uppercase">Cerca</p> 
          <div className="m-0 flex flex-col justify-end"> 
            <input
            tabindex="11"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="cerca_eje_derecho"
                defaultValue={informacionCita?.cerca_eje_derecho}
                placeholder="Derecho"
                ref={register}
              />
            <input
            tabindex="15"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="cerca_eje_izquierdo"
              defaultValue={informacionCita?.cerca_eje_izquierdo}
              placeholder="Izquierdo"
              ref={register}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="text-lg m-0 text-black block sm:hidden uppercase">Actual</p> 
          <div className="m-0 flex flex-col justify-end"> 
            <input
            tabindex="19"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="actual_eje_derecho"
              defaultValue={informacionCita?.actual_eje_derecho}
              placeholder="Derecho"
              ref={register}
            />
    
            <input
            tabindex="23"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="actual_eje_izquierdo"
              defaultValue={informacionCita?.actual_eje_izquierdo}
              placeholder="Izquierdo"
              ref={register}
            />
          </div>

        </div>
      </div>

        {/* -------------------------------------------------------------- */}
         {/* -------------------------------------------------------------- */}
      <div className="flex flex-col">
      <div className="flex flex-row justify-center items-center">
            <p className="text-lg mr-3 text-black uppercase block sm:hidden">Lejos</p>
            <div className="m-0 flex flex-col justify-end ">
            <p className="text-black text-xl font-semibold text-center uppercase">A.V.</p>
              <input
              tabindex="4"
              
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="lejos_av_derecho"
                defaultValue={informacionCita?.lejos_av_derecho}
                placeholder="Derecho"
                ref={register}
              />          
              <input
              tabindex="8"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="lejos_av_izquierdo"
                defaultValue={informacionCita?.lejos_av_izquierdo}
                placeholder="Izquierdo"
                ref={register}
              />
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
   <p className="text-lg mr-3 text-black block sm:hidden uppercase">Cerca</p> 
          <div className="m-0 flex flex-col justify-end"> 
            <input
            tabindex="12"
                className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
                name="cerca_av_derecho"
                defaultValue={informacionCita?.cerca_av_derecho}
                placeholder="Derecho"
                ref={register}
              />
            <input
            tabindex="16"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="cerca_av_izquierdo"
              defaultValue={informacionCita?.cerca_av_izquierdo}
              placeholder="Izquierdo"
              ref={register}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="text-lg m-0 text-black block sm:hidden uppercase">Actual</p> 
          <div className="m-0 flex flex-col justify-end"> 
            <input
            tabindex="20"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="actual_av_derecho"
              defaultValue={informacionCita?.actual_av_derecho}
              placeholder="Derecho"
              ref={register}
            />
    
            <input
            tabindex="24"
              className="border-2 border-gray-400 w-32 rounded-md m-1 text-lg p-1"
              name="actual_av_izquierdo"
              defaultValue={informacionCita?.actual_av_izquierdo}
              placeholder="Izquierdo"
              ref={register}
            />
          </div>

        </div>
      </div>

        {/* -------------------------------------------------------------- */}

        <div className="mx-1 my-1 md:w-full">
          <input
          tabindex="25"
            className="border-2 h-20 md:w-full border-gray-400 rounded-md  text-xl p-3"
            name="observaciones"
            defaultValue={informacionCita?.observaciones}
            placeholder="Observaciones"
            ref={register}
          />
       
        </div>

        <div className="flex flex-wrap  md:flex-row w-full justify-center md:justify-end">
          <div className="mx-1 my-1 flex flex-col sm:flex-row justify-center items-center">
          <p className="text-sm m-0 text-black uppercase">Valor cita</p> 
            <input
            tabindex="26"
            type="number"
              className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
              name="valor_cita"
              defaultValue={informacionCita?.valor_cita}
              placeholder="Valor cita"
              ref={register}
            />
          </div>
          <select tabindex="27" className="border-2 sm:mt-5 h-12 bg-white border-gray-400 rounded-md text-xl" name="fk_id_estado" ref={register}>
            <option value={0}>Re-abrir</option>
            <option value={1}>Consultado</option>
            <option value={2}>Cancelar</option>
          </select>
          <div className="mx-5 my-2">
          <Link href={`/modulocitas`}>
							<a>
              <Button
              tabindex="28"
              variant="contained"
              color="secondary"
              size="large"
              className={`${classes.button}`}
              startIcon={<BlockIcon />}
            >
              Cancelar
            </Button>
							</a>
							</Link>
           
          </div>

          <div className="mx-5 my-2">
            <Button
            tabindex="29"
            disabled={disbledButton}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={`${classes.button}`}
              startIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
