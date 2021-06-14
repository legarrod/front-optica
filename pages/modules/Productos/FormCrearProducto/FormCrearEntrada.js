import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { post } from '../../../api/AsyncHttpRequest';
import 'react-day-picker/lib/style.css';
import getDate from '../../../utils/utils';
import axios from 'axios';

export default function FormCrearEntrada({ setOpen, refresData }) {
  const [allProducts, setAllProducts] = useState([]);
  const url = `${process.env.API_BASE_OPTICA}productos/api/productos/entrada`;
  const urlGetProducts = `${process.env.API_BASE_OPTICA}productos/api/productos`;
  const { register, handleSubmit } = useForm();
  const [disabledButton, setDisabledButton] = useState(false);
  let hoy = new Date();

  const getProduct = async (urlGetProducts, setAllProducts = null) => {
    try {
      const data = await axios.get(urlGetProducts, setAllProducts);
      if (data.data.status_code === 200) {
        setAllProducts(data.data.data);
      }
    } catch (error) {
      refresData();
      swal({
        text: 'Algo salio mal, intentalo nuevamente, por favor!',
        button: {
          text: 'De acuerdo!',
        },
      });
      setOpen(false);
    }
  };

  const succes = (response) => {
    if (response?.data?.data) {
      refresData();
      setDisabledButton(false);
      swal({
        text: 'Bien hecho, se ha creado la entrada',
        button: {
          text: 'De acuerdo!',
        },
      });
      setOpen(false);
    } else {
      refresData();
      swal({
        text: 'Algo salio mal, intentalo nuevamente, por favor!',
        button: {
          text: 'De acuerdo!',
        },
      });
      setOpen(false);
    }
  };

  const onSubmit = (data) => {
    let cantidad = document.getElementById('cantidad').value;
    let costo = document.getElementById('costo').value;
    if (
      cantidad === '' ||
      costo === '' ||
      data.codigo === 'Seleccione un producto'
    ) {
      swal({
        text: 'Por favor complete todos los campos',
        button: {
          text: 'De acuerdo!',
        },
      });
    } else {
      setDisabledButton(true);
      let newData = Object.assign({
        costo_producto: parseInt(data.costo),
        cantidad: parseInt(data.cantidad),
        fk_id_producto: data.codigo,
        fk_id_entrada: 1,
        fecha_entrada: getDate(hoy),
      });
      post(url, newData, succes);
    }
  };

  useEffect(() => {
    getProduct(urlGetProducts, setAllProducts);
  }, []);

  return (
    <form
      className="flex flex-col w-80 justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <select
        className="border-2 p-2 bg-white rounded-md text-xl my-3 sm:m-3 w-80"
        name="codigo"
        ref={register}
      >
        <option disabled selected>
          Seleccione un producto
        </option>
        {allProducts.length > 0 &&
          allProducts?.map((item) => (
            <option value={item.codigo}>{item.nombre}</option>
          ))}
      </select>
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="cantidad"
        id="cantidad"
        placeholder="Cantidad"
        ref={register}
      />
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="costo"
        id="costo"
        placeholder="Costo"
        ref={register}
      />

      <input
        disabled={disabledButton}
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}
