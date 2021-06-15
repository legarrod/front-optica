import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import axios from 'axios';
import 'react-day-picker/lib/style.css';

export default function FormCrearProducto({ setOpen, refresData }) {
  const url = `${process.env.API_CREAR_PRODUCTO}`;
  const [files, setFiles] = useState({});
  const { register, handleSubmit } = useForm();
  const [dataResponse, setDataResponse] = useState('');
  const urlGetLastProduct = `${process.env.API_BASE_OPTICA}productos/api/productos-last-created`;
  const [lastProduct, setLastProduct] = useState();

  const postProducto = async (url, formData = null, succes = null) => {
    try {
      const data = await axios.post(url, formData);

      if (data.data) {
        swal({
          text: 'Bien hecho, se ha creado el producto',
          button: {
            text: 'De acuerdo!',
          },
        });
        succes(data.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const succes = (data) => {
    setDataResponse(data);
    refresData();
  };

  const onSubmit = (data) => {
    let codigo = document.getElementById('codigo').value;
    let nombre = document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    if (codigo === '' || nombre === '' || descripcion === '') {
      swal({
        text: 'Por favor complete todos los campos',
        button: {
          text: 'De acuerdo!',
        },
      });
    } else {
      let newData = Object.assign({
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: lastProduct,
      });
      postProducto(url, newData, succes);
    }
  };

  const getLastProduct = async (urlGetLastProduct, setNewCode = null) => {
    try {
      const data = await axios.get(urlGetLastProduct);
      setNewCode(data?.data?.data[0]?.codigo);
    } catch (error) {
      console.log(error);
    }
  };

  const convertirBase = (archivos) => {
    Array.from(archivos).forEach((archivos) => {
      let reader = new FileReader();
      reader.readAsDataURL(archivos);
      reader.onload = function () {
        let aux = [];
        var base64 = reader.result;
        aux = base64.split(',');
        setFiles({
          imagen: aux[1],
        });
        // post(urlImg, {
        // 	idworker:idWorker,
        // 	image: aux[1],
        // 	activo: 1
        // 	}, success)
      };
    });
  };
  const setNewCode = (value) => {
    let newValue = parseInt(value.split('P')[1]);
    if (newValue <= 100) {
      newValue = 'P0' + (newValue + 1);
    } else {
      newValue = 'P' + (newValue + 1);
    }
    setLastProduct(newValue);
  };

  useEffect(() => {
    getLastProduct(urlGetLastProduct, setNewCode);
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
        disabled
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="codigo"
        id="codigo"
        placeholder="Codigo"
        value={lastProduct}
        ref={register}
      />
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="nombre"
        id="nombre"
        placeholder="Nombre"
        ref={register}
      />
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="descripcion"
        id="descripcion"
        placeholder="Descripcion"
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
