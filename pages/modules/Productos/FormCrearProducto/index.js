import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import getDate from "../../../utils/utils";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export default function FormCrearProducto({ setOpen, refresData }) {
  const url = `${process.env.API_CREAR_PRODUCTO}`;
  const [data, setData] = useState();
  const [idPaciente, setIdPaciente] = useState();
  const [files, setFiles] = useState({});
  const { register, handleSubmit } = useForm();
  const [dataResponse, setDataResponse] = useState("");

  const postProducto = async (url, formData = null, succes = null) => {
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    if (codigo === "" || nombre === "" || descripcion === "") {
      swal({
        text: "Por favor complete todos los campos",
        button: {
          text: "De acuerdo!",
        }
      })
    } else {
      try {
        const data = await axios.post(url, formData);
       
        if (data.data === "agregado correctamente") {
          swal({
            text: "Bien hecho, se ha creado el producto",
            button: {
              text: "De acuerdo!",
            }
          })
          succes(data.statusText);
        }
      } catch (error) {
        console.log(error);
      }
      //return axios.post(url, formData);
    }
  };

 const succes =(data)=>{
   console.log(data);
  setDataResponse(data)
  refresData();
 };

  const onSubmit = (data) => {
	  let newdata = Object.assign(data, files);
	 
    postProducto(url, data, succes)
  };

//   const obtenerPaciente = async (urlConsultarPaciente, cedulaPaciente, setData) => {
//     let urlN = `${urlConsultarPaciente}/${cedulaPaciente}`
//     try {
//       const { data } = await axios.get(urlN);
      
//       if (data) {
//         setData(data);
//         setIdPaciente(data.id)
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

  const convertirBase =(archivos)=>{
	Array.from(archivos).forEach( archivos => {
		let reader = new FileReader();
		reader.readAsDataURL(archivos);
		reader.onload=function () {
			let aux =[];
			var base64 = reader.result;
			aux=base64.split(',');
			setFiles({	
				imagen: aux[1],
				})
				// post(urlImg, {	
				// 	idworker:idWorker,
				// 	image: aux[1],
				// 	activo: 1
				// 	}, success)
		}
	})
}

  useEffect(() => {
    //obtenerPaciente(urlConsultarPaciente, cedulaPaciente, setData)
    if (dataResponse) {
      setOpen(false);
    }
	
	
  }, [dataResponse]);
  
  return (
    <form
      className="flex flex-col w-80 justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
    
	  <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="codigo"
          id="codigo"
          placeholder="Codigo"
          value={data?.codigo}
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="nombre"
          id="nombre"
          placeholder="Nombre"
          value={data?.nombre}
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion"
          value={data?.descripcion}
          ref={register}
        />
       {/* <div>
			<label htmlFor="upload-button">
			<CloudDownloadIcon className="ml-10" style={{ fontSize: 50 }}/>
			</label>
			<input type="file" id="upload-button" style={{ display: 'none' }} onChange={(e)=>convertirBase(e.target.files)} />
			<p className="ml-10 text-sm">Upload photo</p>
		</div> */}
  
      
      <input
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}
