import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
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

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
	},
  });
  
  function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
  }


export default function FormCrearFactura({ setOpen, cedulaPaciente }) {
  let hoy = new Date();
  //const url = `${process.env.API_REGISTRAR_NUEVA_CITA}`;
  const [data, setData] = useState();
  const [valueTextarea, setValueTextarea]=useState();
  const { register, handleSubmit } = useForm();
  const urlGetPacientes = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
  const urlGetProductos = `${process.env.API_OBTENER_TODOS_LOS_PRODUCTOS}`;
  const [listadoProductos, setListadoProductos] = useState();
  const [listadoPacientes, setListadoPacientes] = useState();
  const [viewInputsNewProducts, setViewInputsNewProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedPaciente, setSelectedPaciente] = useState({});
  const [price, setPrice] =useState();
  const [cantidad, setCantidad] =useState();
  const [dataProductDetail, setDataProductDetail] =useState([]);
  const [invoiceData, setInvoiceData]=useState({});
  const [total, setTotal]=useState(0);
  const [detailInvoice, setDetailInvoice]=useState([]);
  const classes = useStyles();
  
 const getProductos = async (urlGetProductos, setListadoProductos) => {
	try {
	  const { data } = await axios.get(urlGetProductos);
	  if (data) {
		setListadoProductos(data);
	  }
	} catch (error) {
	  console.log(error.message);
	}
  };

//   const postCita = async (url, formData = null, setDataResponse = null) => {
//     console.log(url);
//     console.log(formData);
//     try {
//       const data = await axios.post(url, formData);
//       console.log(data);
//       if (data.data === "Paciente agregado correctamente") {
//         setDataResponse(data.statusText);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     //return axios.post(url, formData, config);
//   };
const calculateTotal =(price)=>{
	//let total = price;
	let subTotal = total + parseInt(price);
		setTotal(subTotal)
	
}

const createDetail =(data)=>{
	setDetailInvoice([
		...detailInvoice, 
		data
	])
}

	const onSubmit = (data) => { 
		console.log(data);
	};

	const handleTextarea = (e)=>{
		setValueTextarea(e.target.value)
		setInvoiceData(Object.assign(invoiceData, {observaciones: e.target.value}))
	}
	const handlerSlectProducto =(e)=>{
		let index = e.target.selectedIndex;

		setSelectedProduct({id: e.target.value, name:e.target.options[index].text})
		setViewInputsNewProducts(true);
	}
	const handlerSlectPaciente =(e)=>{
		let index = e.target.selectedIndex;

		setSelectedPaciente({id: e.target.value, name:e.target.options[index].text})

	}
	const handlerAddProductDetail =(e)=>{
		let detail = e.target.value
		//setDataProductDetail(Object.assign(selectedProduct, {price: price}))
		createDetail(Object.assign(selectedProduct, {cantidad: cantidad, price: price}))
		calculateTotal(price * cantidad);
	}

useEffect(() => {
	getProductos(urlGetProductos, setListadoProductos);
	getProductos(urlGetPacientes, setListadoPacientes);
	
console.log(listadoPacientes);
}, [urlGetProductos, setListadoProductos, invoiceData])
  

  return (
	  <div className="flex flex-col md:flex-row">
		<form
			className="flex flex-wrap justify-center flex-col w-full md:w-2/3"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
			<select className="border-2 p-2 bg-white rounded-md text-xl my-3 sm:m-3 w-80" name="id_producto" ref={register} onClick={(e) => handlerSlectPaciente(e)}>
				{
				listadoPacientes && listadoPacientes[0]?.map(item=>(
						<option value={item.idproducto}>{item.nombre}</option>
					))
				}
			</select>
			<div className="flex flex-wrap flex-col w-full sm:w-3/12 justify-center">
				<input
					className="border-2 border-gray-400 rounded-md mt-3 sm:m-3 text-xl"
					name="numero_factura"
					placeholder="Factura Numero"
					onChange={e =>setInvoiceData({numero_factura: e.target.value})}
					value={data?.numero_factura}
					ref={register}
				/>
				{/* <input
					className="border-2 border-gray-400 rounded-md my-3 sm:m-3 text-xl"
					name="valor_factura"
					placeholder="Valor factura"
					onChange={e =>setInvoiceData(Object.assign(invoiceData, {valor_factura: e.target.value}))}
					value={data?.valor_factura}
					ref={register}
				/> */}
				<textarea className="border-b-4 border-2 w-full sm:w-80 border-gray-400 rounded-md my-3 sm:m-3  sm:mx-3 px-2 h-16 shadow-lg" 
					name="observaciones" 
					placeholder="Observaciones"
					onChange={(e)=> handleTextarea(e)}
					ref={register}/>

				<select className="border-2 p-2 bg-white rounded-md text-xl my-3 sm:m-3 w-80" name="fk_id_estado" ref={register}>
					<option value={0}>Pendiente</option>
					<option value={1}>Pagada</option>
					<option value={2}>Cancelada</option>
				</select>
				
			</div>
			
			</div>

			<div>
			<select className="border-2 p-2 bg-white rounded-md text-xl my-3 sm:m-3 w-80" name="id_producto" ref={register} onClick={(e) => handlerSlectProducto(e)}>
				{
					listadoProductos?.map(item=>(
						<option value={item.idproducto}>{item.nombre}</option>
					))
				}
			</select>
			{
				viewInputsNewProducts && <div>
											<label>{selectedProduct.name}</label>
											<input
												className="border-2 border-gray-400 rounded-md w-32 my-3 sm:m-3 text-xl"
												name="valor_gafa"
												placeholder="$"
												ref={register}
												onChange={(e)=>setPrice(e.target.value)}
											/>
											<input
											type='number'
												className="border-2 border-gray-400 rounded-md w-20 my-3 sm:m-3 text-xl"
												name="cantidad"
												placeholder=""
												ref={register}
												onChange={(e)=>setCantidad(e.target.value)}
											/>
											<AddCircleIcon className="" style={{fontSize: 30}} onClick={(e)=>handlerAddProductDetail(e)}/>
										</div>
			}
			
			</div>
			<div className='w-full flex '>
				<input
				className="bg-red-600 py-1 mx-2 px-10 rounded-md text-white font-semibold"
				value='Cancelar'
				type="submit"
				/>
				<input
				className="bg-blue-700 py-1 mx-2 px-10 rounded-md text-white font-semibold"
				type="submit"
				/>
			</div>
		</form>
		<div className="w-full border border-gray-500 rounded-lg p-5 my-5">
			<div className='flex flex-wrap'>
				<div className="flex flex-row mr-5">
					<p className="font-semibold text-lg">Nombre cliente:</p>
					<p className="text-lg ml-3">{selectedPaciente.name}</p>
				</div>
				<div className="flex flex-row mx-5">
					<p className="font-semibold text-lg">No. Factura:</p>
					<p className="text-lg ml-3">{invoiceData.numero_factura}</p>
				</div>
				<div className="flex flex-row my-3 w-11/12">
					<p className="font-semibold text-lg">Observaciones:</p>
					<p className="text-lg ml-3">{invoiceData.observaciones}</p>
				</div>
				
			</div>
			<div className='mt-10'>
			<div style={{ height: 400, width: '100%' }}>
			<TableContainer component={Paper}>
				<Table className={classes.table} size="small" aria-label="a dense table">
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
						<TableCell component="th" scope="row">
							{row.name}
						</TableCell>
						<TableCell align="right">{row.cantidad}</TableCell>
						<TableCell align="right">{row.price}</TableCell>
						<TableCell align="right">{row.cantidad * row.price} </TableCell>
						<TableCell align="right"><DeleteForeverIcon className="" style={{fontSize: 20}}/></TableCell>
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
			
			<div className='flex flex-row justify-end items-end'>
				<p className='text-2xl'>Total</p>
				<p className='text-2xl mx-5'>$ {total}</p>
			</div>
			
		</div>
	</div>
  );
}
