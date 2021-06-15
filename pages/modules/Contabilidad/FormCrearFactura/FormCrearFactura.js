import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import getDate from '../../../utils/utils';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#ffffff',
    border: '2px solid #000',
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function FormCrearFactura({ setOpen, cedulaPaciente }) {
  const router = useRouter();
  let hoy = new Date();
  const urlSalida = `${process.env.API_BASE_OPTICA}productos/api/productos/salida`;
  const urlPostDetalleFactura = `${process.env.API_BASE_OPTICA}contabilidad/api/facturas/creardetallefactura`;
  //const url = `${process.env.API_REGISTRAR_NUEVA_CITA}`;
  const [valueTextarea, setValueTextarea] = useState();
  const urlLastInvoice = `${process.env.API_BASE_OPTICA}contabilidad/api/invoice-last-created`;
  const { register, handleSubmit } = useForm();
  const urlGetPacientes = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
  const urlPosTFactura = `${process.env.API_CREAR_FACTURA}`;
  const url = `${process.env.API_OBTENER_ID_FACTURA}`;
  const urlGetProductos = `${process.env.API_OBTENER_TODOS_LOS_PRODUCTOS}`;
  //const urlPostDetalleFactura = `${process.env.API_CREAR_DETALLE_FACTURA}`;
  const [listadoProductos, setListadoProductos] = useState([]);
  const [listadoPacientes, setListadoPacientes] = useState([]);
  const [viewInputsNewProducts, setViewInputsNewProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedPaciente, setSelectedPaciente] = useState({});
  const [price, setPrice] = useState();
  const [cantidad, setCantidad] = useState(1);
  const [invoiceData, setInvoiceData] = useState({});
  const [total, setTotal] = useState(0);
  const [detailInvoice, setDetailInvoice] = useState([]);
  const [estado, setEstado] = useState('Pendiente');
  const [facturaPendiente, setFacturaPendiente] = useState(false);
  const classes = useStyles();
  const [idFactura, setIdFactura] = useState(0);
  const [numeroFac, setNumeroFac] = useState();
  const [copyDetalle, setcopyDetalle] = useState([]);
  const [dataResponse, setDataResponse] = useState();
  const [facturaOk, setFacturaOk] = useState();
  const [sinInternet, setSinInternet] = useState(false);

  const getProductos = async (urlGetProductos, setListadoProductos) => {
    try {
      const { data } = await axios.get(urlGetProductos);
      if (data.status_code === 200) {
        setListadoProductos(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const success = (data) => {
    if (data.data.data === true) {
      localStorage.removeItem('respaldoFactura');
      localStorage.removeItem('facturaSinGuardar');
      setFacturaPendiente(false);
      getIdFactura(
        `${url}` + (parseInt(numeroFac) + 1),
        setIdFactura,
        setFacturaOk
      );
    }
  };

  const postFactura = async (url, formData = null, success = null) => {
    try {
      const data = await axios.post(url, formData);
      success(data);
    } catch (error) {
      console.log(error);
    }
  };
  const postDetalle = async (
    url,
    formData = null,
    setResponseSuccess = null
  ) => {
    try {
      const data = await axios.post(url, formData);
      setResponseSuccess(data);
      if (data.data.data === true) {
        localStorage.removeItem('copyDetalle');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (price) => {
    let subTotal = total + parseInt(price);
    setTotal(subTotal);
  };

  const createDetail = (data) => {
    setDetailInvoice([...detailInvoice, data]);
  };

  const onSubmit = (data) => {
    let newData = {
      id_factura: parseInt(numeroFac) + 1,
      valor_factura: total,
      fechasalida: getDate(hoy),
      cc_usuario: data.id_paciente ? parseInt(data.id_paciente) : 0,
      numero_factura: parseInt(numeroFac) + 1,
      estado_factura: estado,
      observaciones: data.observaciones,
    };
    setcopyDetalle(
      detailInvoice.map((item) => ({
        id_factura: idFactura,
        id_producto: parseInt(item.id),
        cantidad: parseInt(item.cantidad),
        valor_producto: parseInt(item.price),
        codigo: item.codigo,
      }))
    );
    localStorage.setItem('copyDetalle', JSON.stringify(copyDetalle));
    localStorage.setItem('respaldoFactura', JSON.stringify(newData));
    localStorage.setItem('facturaSinGuardar', true);
    postFactura(urlPosTFactura, newData, success);
  };

  const handleTextarea = (e) => {
    setValueTextarea(e.target.value);
    setInvoiceData(
      Object.assign(invoiceData, { observaciones: e.target.value })
    );
  };
  const handlerSlectProducto = (e) => {
    let index = e.target.selectedIndex;
    let value = JSON.parse(e.target.value);
    setSelectedProduct({
      codigo: value.codigo,
      id: value.idproducto,
      name: e.target.options[index].text,
    });
    setViewInputsNewProducts(true);
  };
  const handlerSlectPaciente = (e) => {
    let index = e.target.selectedIndex;
    setSelectedPaciente({
      id: e.target.value,
      name: e.target.options[index].text,
    });
  };
  const handlerSlectEstado = (e) => {
    let index = e.target.selectedIndex;
    setEstado(e.target.options[index].text);
  };
  const handlerReenviar = () => {
    let backup = JSON.parse(localStorage.getItem('respaldoFactura'));
    postFactura(urlPosTFactura, backup, success);
    console.log('reenviado...');
  };
  const handlerAddProductDetail = (e) => {
    let detail = e.target.value;
    //setDataProductDetail(Object.assign(selectedProduct, {price: price}))
    createDetail(
      Object.assign(selectedProduct, { cantidad: cantidad, price: price })
    );
    calculateTotal(price * cantidad);
  };
  const handlerQuitarProducto = (row) => {
    const nuevoDetalle = detailInvoice.filter(
      (producto) => producto.id !== row.id
    );
    setDetailInvoice(nuevoDetalle);
    let subTotal = total - parseInt(row.price);
    setTotal(subTotal);
  };

  const setResponseSuccess = (response) => {
    if (response.data.data === true) {
      router.push('/contabilidad');
    }
  };

  const saveDetalleFactura = () => {
    let newCodigo = parseInt(numeroFac) + 1;

    //parseInt(numeroFac) + 1
    let data = detailInvoice.map((item) => ({
      id_factura: idFactura,
      id_producto: parseInt(item.id),
      cantidad: parseInt(item.cantidad),
      valor_producto: parseInt(item.price),
      codigo: item.codigo,
    }));
    let newData = data.map((item) => ({
      fk_id_producto: item.codigo,
      cantidad: item.cantidad,
      fecha_salida: getDate(hoy),
    }));
    let newDataDetalle = data.map((item) => ({
      id_factura: newCodigo,
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      valor_producto: item.valor_producto,
    }));
    postFactura(urlSalida, newData);
    postDetalle(urlPostDetalleFactura, newDataDetalle, setResponseSuccess);
  };

  const getIdFactura = async (url, setIdFactura, setFacturaOk = null) => {
    try {
      const { data } = await axios.get(url);
      setIdFactura(data.data[0].id);
      setFacturaOk(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getlastIdFactura = async (url, setIdFactura) => {
    try {
      const { data } = await axios.get(url);
      setIdFactura(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const validacionesStatus = (dataResponse) => {
    if (dataResponse?.status_code !== 200) {
      setFacturaPendiente(
        localStorage.getItem('facturaSinGuardar')
          ? JSON.parse(localStorage.getItem('facturaSinGuardar'))
          : false
      );
    }

    if (dataResponse?.status_code === 200) {
      localStorage.removeItem('dataDetallefactura');
      localStorage.removeItem('facturaSinGuardar');
      localStorage.removeItem('respaldoFactura');
      getIdFactura(
        `${url}${invoiceData.numero_factura}`,
        setIdFactura,
        setFacturaOk
      );
    }
  };

  const responseLastInvoice = (response) => {
    setNumeroFac(response.data[0].codigo);
  };

  useEffect(() => {
    if (facturaOk) {
      saveDetalleFactura();
    }
    if (navigator.onLine) {
      getProductos(urlGetProductos, setListadoProductos);
      getProductos(urlGetPacientes, setListadoPacientes);
      validacionesStatus(dataResponse);
    } else {
      setSinInternet(true);
      //router.push('/')
    }
    getlastIdFactura(`${urlLastInvoice}`, responseLastInvoice);
  }, [urlGetProductos, setListadoProductos, dataResponse, facturaOk]);

  return (
    <div className="flex flex-col md:flex-row">
      <form
        className="flex flex-wrap mt-5 flex-col w-full md:w-2/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <select
            className="border-2 p-2 bg-white rounded-md text-xl my-3 sm:m-3 w-80 uppercase"
            name="id_paciente"
            ref={register}
            onClick={(e) => handlerSlectPaciente(e)}
          >
            {listadoPacientes.length > 0 &&
              listadoPacientes?.map((item) => (
                <option className="uppercase" value={item.id}>
                  {item.nombre}
                </option>
              ))}
          </select>
          <div className="flex flex-wrap flex-col w-full sm:w-3/12 justify-center">
            {/* <input
              className="border-2 border-gray-400 rounded-md mt-3 sm:m-3 text-xl"
              name="numero_factura"
              placeholder="Factura Numero"
              onChange={(e) =>
                setInvoiceData({ numero_factura: e.target.value })
              }
              value={data?.numero_factura}
              ref={register}
            /> */}
            {/* <input
					className="border-2 border-gray-400 rounded-md my-3 sm:m-3 text-xl"
					name="valor_factura"
					placeholder="Valor factura"
					onChange={e =>setInvoiceData(Object.assign(invoiceData, {valor_factura: e.target.value}))}
					value={data?.valor_factura}
					ref={register}
				/> */}
            <textarea
              className="border-b-4 border-2 w-full sm:w-80 border-gray-400 rounded-md my-3 sm:m-3  sm:mx-3 px-2 h-16 shadow-lg"
              name="observaciones"
              placeholder="Observaciones"
              onChange={(e) => handleTextarea(e)}
              ref={register}
            />

            <select
              className="border-2 p-2 bg-white rounded-md text-xl my-3 sm:m-3 w-80"
              name="fk_id_estado"
              ref={register}
              onClick={(e) => handlerSlectEstado(e)}
            >
              <option value={0}>Pendiente</option>
              <option value={1}>Pagada</option>
              <option value={2}>Cancelada</option>
            </select>
          </div>
        </div>

        <div>
          <select
            className="border-2 p-2 bg-white rounded-md text-xl my-3 sm:m-3 w-80"
            name="id_producto"
            ref={register}
            onClick={(e) => handlerSlectProducto(e)}
          >
            <option className="uppercase">Selcciona un articulo</option>
            {listadoProductos.length > 0 &&
              listadoProductos?.map((item) => (
                <option
                  className="uppercase"
                  value={JSON.stringify({
                    idproducto: item.idproducto,
                    codigo: item.codigo,
                  })}
                >
                  {item.nombre}
                </option>
              ))}
          </select>
          {viewInputsNewProducts && (
            <div className="flex flex-col">
              <label className="uppercase">{selectedProduct.name}</label>
              <div className="flex flex-row justify-start items-center">
                <input
                  className="border-2 border-gray-400 rounded-md w-32 my-3 sm:m-3 text-xl"
                  name="valor_gafa"
                  placeholder="$"
                  ref={register}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="border-2 border-gray-400 rounded-md w-20 my-3 sm:m-3 text-xl"
                  name="cantidad"
                  placeholder=""
                  ref={register}
                  onChange={(e) => setCantidad(e.target.value)}
                />
                <AddCircleIcon
                  className=""
                  style={{ fontSize: 30 }}
                  onClick={(e) => handlerAddProductDetail(e)}
                />
              </div>
            </div>
          )}
        </div>
        {facturaPendiente === false && !sinInternet ? (
          <div className="w-full flex ">
            <input
              className="bg-red-600 py-1 mx-2 px-10 rounded-md text-white font-semibold"
              value="Cancelar"
              type="submit"
            />
            <input
              className={
                detailInvoice.length > 0
                  ? 'bg-blue-700 py-1 mx-2 px-10 rounded-md text-white font-semibold'
                  : 'bg-gray-400 py-1 mx-2 px-10 rounded-md text-white font-semibold'
              }
              disabled={detailInvoice.length > 0 ? false : true}
              type="submit"
            />
          </div>
        ) : (
          ''
        )}
        {facturaPendiente === true && (
          <button
            className="bg-red-600 py-1 mx-2 px-10 rounded-md text-white font-semibold"
            onClick={() => handlerReenviar()}
            type="button"
          >
            Tienes una factura pendiente
          </button>
        )}
        {sinInternet && (
          <div className="bg-white  w-64 h-64 flex flex-col">
            <center>
              <CircularProgress />
            </center>
            <p className="text-center">Lo sentimos no tienes Internet</p>
          </div>
        )}
      </form>
      <div className="w-full border border-gray-500 rounded-lg p-5 my-5">
        <div className="flex flex-wrap">
          <div className="flex flex-row mr-5">
            <p className="font-semibold text-lg">Nombre cliente:</p>
            <p className="text-lg ml-3">{selectedPaciente.name}</p>
          </div>
          <div className="flex flex-row mx-5">
            <p className="font-semibold text-lg">No. Factura:</p>
            {/* <p className="text-lg ml-3">{invoiceData.numero_factura}</p> */}
            <p className="text-lg ml-3">F{parseInt(numeroFac) + 1}</p>
          </div>
        </div>
        <div className="mt-10">
          <div style={{ height: 400, width: '100%' }}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precion Unidad</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailInvoice.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell
                        className="uppercase"
                        component="th"
                        scope="row"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.cantidad}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">
                        {row.cantidad * row.price}{' '}
                      </TableCell>
                      <TableCell align="right">
                        <DeleteForeverIcon
                          className=""
                          style={{ fontSize: 20 }}
                          onClick={() => handlerQuitarProducto(row)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {/* {
					detailInvoice?.map(item => <><div className="flex flex-row">
						<p className="font-semibold text-xs">Nombre:</p>
						<p className="text-xs ml-3">{item.name}</p>
					</div>
					<div className="flex flex-row">
						<p className="font-semibold text-xs">Precio:</p>
						<p className="text-xs ml-3">{item.price}</p>
					</div></>)
				} */}
        </div>
        <div className="flex flex-row my-3 w-11/12">
          <p className="font-semibold text-lg">Observaciones:</p>
          <p className="text-xs ml-3 text-gray-600 border w-56 h-16 rounded-lg p-2">
            {invoiceData.observaciones}
          </p>
        </div>
        <div className="flex flex-row justify-end items-end">
          <p className="text-2xl">Total</p>
          <p className="text-2xl mx-5">$ {total}</p>
        </div>
      </div>
    </div>
  );
}
