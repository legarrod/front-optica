import React, {useState, useEffect, useMemo} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import Modal from "@material-ui/core/Modal";
import { useSpring, animated } from "react-spring/web.cjs";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import { useForm } from "react-hook-form";
import getDate from "../../../utils/utils";
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Factura from "../Factura/Factura"
import { put, remove} from '../../../api/AsyncHttpRequest'
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';


const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: theme.palette.common.black,
	  color: theme.palette.common.white,
	},
	body: {
	  fontSize: 14,
	},
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
	root: {
	  '&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	  },
	},
  }))(TableRow);
  
  function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
  }

const useStyles = makeStyles((theme) => ({
	modal: {
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "center",
	},
	paper: {
	  backgroundColor: theme.palette.background.paper,
	  border: "2px solid #000",
	  boxShadow: theme.shadows[5],
	  padding: theme.spacing(2, 4, 3),
	},
  }));

const Fade = React.forwardRef(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
	  from: { opacity: 0 },
	  to: { opacity: open ? 1 : 0 },
	  onStart: () => {
		if (open && onEnter) {
		  onEnter();
		}
	  },
	  onRest: () => {
		if (!open && onExited) {
		  onExited();
		}
	  },
	});
  
	return (
	  <animated.div ref={ref} style={style} {...other}>
		{children}
	  </animated.div>
	);
  });


export default function TablaClientesAbonos({allInvoices, setAllInvoices, getAllInvoices}) {
	let hoy = new Date();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataInfo, setDataInfo] = useState();
  const urlAgregarAbono = `${process.env.API_REGISTRAR_ABONO}`;
  const urlObtenerFacturas = `${process.env.API_OBTENER_FACTURAS}`;
  const urlObtenerFacturaPersona = `${process.env.API_OBTENER_FACTURA_PERSONA}`;
  const urlObtenerDetallePorFactura = `${process.env.API_OBTENER_DETALLER_POR_FACTURA}`;
  const urlRemove = `${process.env.API_ELIMINAR_FACTURA}`;
  const urlRemoveAbono = `${process.env.API_ELIMINAR_ABONO}`;
  const urlActualizarStado = `${process.env.API_ACTUALIZAR_ESTADO_CITA}`;
  const urlObtenerAbonosFactura = `${process.env.API_OBTENER_ABONOS_POR_FACTURA}`;
  const [dataResponse, setDataResponse] = useState();
  const [allAbonos, setAllAbonos] = useState();
  const [facturaPersona, setFacturaPersona] = useState({});
  const [detalleFactura, setDetalleFactura] = useState([]);
  const { register, handleSubmit } = useForm();
 const [temConsultaAbono, setTemConsultaAbono] = useState();
 const [viewDetalleAbonos, setViewDetalleAbonos] = useState(false);
 const [viewFactura, setViewFactura] = useState(false);
 const [cedulaTemp, setCedulaTemp] =useState();
 const [reconsultaAbonos, setReconsultaAbonos] =useState();
  const [disabledBotonEnviarAbono, setDisabledBotonEnviarAbono] = useState(false)
  const [rowTemporal, setRowTemporal] = useState({})
  const [controlRefresFactura, setControlRefresFactura] = useState(false)

  const handleClose = () => {
	  setOpen(false);
	};
 
	const responseCallback = (response)=>{
		if (response.data === 'Factura eliminada correctamente') {
			swal({
				text: response.data,
				button: {
				  text: "De acuerdo!",
				}
			  })
			  getAllInvoices(urlObtenerFacturas, setAllInvoices);
		}
		if (response.data === 'Abono eliminado') {
			swal({
				text: response.data,
				button: {
				  text: "De acuerdo!",
				}
			  })
			  setControlRefresFactura(true)
			  getAllInvoices(urlObtenerFacturas, setAllInvoices);
			  getAbonos(temConsultaAbono, callbackResponseGetAbonos);
		}
		if (response.data.data === true) {
			getAllInvoices(urlObtenerFacturas, setAllInvoices);
			setOpen(false);
			setControlRefresFactura(true)
			getAbonos(temConsultaAbono, callbackResponseGetAbonos);
		}
		if(response.data.text){
			swal({
				text: 'Algo salio mal, intentalo de nuevo puede ser que quieras eliminar una factura con abonos',
				button: {
				  text: "De acuerdo!",
				}
			  })
		}

	}
	const callbackResponseGetAbonos =(data)=>{
		setAllAbonos(data.data.data)
		if (disabledBotonEnviarAbono) {
			getAbonos(reconsultaAbonos, callbackResponseGetAbonos)
			setDisabledBotonEnviarAbono(false)
			setOpen(false);
		}else{
			setDisabledBotonEnviarAbono(false)
		}
		
	}

	const getInvoices = async (urlObtenerFacturas, setAllInvoices = null) => {
		try {
			const data = await axios.get(urlObtenerFacturas, setAllInvoices);
			if (data) {
			//setAllProducts(data.data);
			setAllInvoices(data.data.data)
			}
		} catch (error) {
			console.log(error);
		}

	}
	const getAbonos = async (urlObtenerAbonosFactura, callbackResponseGetAbonos = null) => {
		try {
			const data = await axios.get(urlObtenerAbonosFactura);
			if (data) {
			//setAllProducts(data.data);
			callbackResponseGetAbonos(data)
			}
		} catch (error) {
			console.log(error);
		}

	}
	const postAbono = async (url, formData = null, responseCallback = null) => {

		try {
		  const data = await axios.post(url, formData);
		  if (data) {
			responseCallback(data);
		  }
		} catch (error) {
		  console.log(error);
		}
	  };
	

	const verListadoAbonos =(value)=> {
		setRowTemporal(value)
		setReconsultaAbonos(`${urlObtenerAbonosFactura}${value.id}`)
		getAbonos(`${urlObtenerAbonosFactura}${value.id}`, callbackResponseGetAbonos);
		setTemConsultaAbono(`${urlObtenerAbonosFactura}${value.id}`)
		setDataInfo(value);
		setViewFactura(false)
		setViewDetalleAbonos(true);	
	};

	const refresData =()=>{
		getInvoices(urlObtenerFacturas, setAllInvoices);
	}  

	const onSubmit = (data) => {
		setDisabledBotonEnviarAbono(true)
		let dataSaved = {
			fk_id_factura: parseInt(dataInfo.id),
			valor_abono: parseInt(data.abono),
			fecha_abono: getDate(hoy),
			usuario_registro_abono: 1,
			nota_abono: data.note,
		};
		postAbono(urlAgregarAbono, dataSaved, responseCallback);
	};

	const handlerBuscarFactura = (data)=>{
		setCedulaTemp(data.cedula);
		getInvoices(`${urlObtenerFacturaPersona}${data.cedula}`, setFacturaPersona);
		setViewFactura(true);
		setViewDetalleAbonos(false)
	}
	const handlerImprimirFactura =()=>{
		window.print()
	}
	const callbackResponse =(data)=>{
		refresData()
	}
	const handlerEliminarAbono = (idFactura)=>{

		let id = parseInt(idFactura.id)
		remove(`${urlRemoveAbono}${id}`, responseCallback)
	}

	const eliminarFactura =(idFactura)=>{
		let id = parseInt(idFactura.id)
		remove(`${urlRemove}${id}`, responseCallback)
	}
	const handlerSaveState =(data)=>{
		let index = data.e.target.selectedIndex;
		let newData = {estado: data.e.target.options[index].text, id_factura: parseInt(data.row.id)}

		// put(url, Object.assign(data, defaultInfo), setDataResponse)
		put(urlActualizarStado, newData, callbackResponse)
		
	}	
	const formatData =(rowTemporal)=>{
		if (controlRefresFactura) {
			allInvoices.filter((item)=>{item.id === rowTemporal.id && setDataInfo(item)})
			setControlRefresFactura(false)
		}		
	}

	useEffect(() => {
		refresData();		
		if (facturaPersona.length >=0) {
			getInvoices(`${urlObtenerDetallePorFactura}${facturaPersona[0].id}`, setDetalleFactura);
		}
		
	}, [dataResponse, facturaPersona ])

	useMemo(() => formatData(rowTemporal, allInvoices), [rowTemporal, allInvoices])

  return (
	< div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row w-full">
			<div className="w-full px-1 sm:px-8">
				<p className="text-2xl w-full text-center mb-2">Facturas pendientes</p>
				<div className="overflow-y-auto mx-0 w-full sm:mx-3 h-96">
						<TableContainer component={Paper}>
							<Table aria-label="customized table">
								<TableHead>
								<TableRow>
									<StyledTableCell align="center">Ver</StyledTableCell>
									<StyledTableCell align="center">Cedula</StyledTableCell>
									<StyledTableCell align="center">Nombre</StyledTableCell>
									<StyledTableCell align="left">Estado</StyledTableCell>
								</TableRow>
								</TableHead>
								<TableBody>
								{allInvoices?.map((row, index) => (
									<StyledTableRow key={index}>
									<StyledTableCell align="center">
										<button><RemoveRedEyeIcon onClick={() => verListadoAbonos(row)}/></button>
										<button><CloudDownloadIcon onClick={() => handlerBuscarFactura(row)}/></button>
										<button><DeleteIcon onClick={() => eliminarFactura(row)}/></button>
									</StyledTableCell>
									<StyledTableCell align="center">{row.cedula}</StyledTableCell>
									<StyledTableCell align="center">{row.paciente}</StyledTableCell>
									{/* /<StyledTableCell align="left"><p className={row.estado === 'Pendiente' ? 'bg-yellow-400 p-2 w-28 text-center rounded-lg' : row.estado === 'Pagada' ? 'bg-green-400 p-2 w-28 text-center rounded-lg': 'bg-red-400 p-2 w-28 text-center rounded-lg'}>{row.estado}</p></StyledTableCell> */}
									<select className={row.estado === 'Pendiente' ? 'bg-yellow-400 p-2 w-28 text-center rounded-lg my-3' : row.estado === 'Pagada' ? 'bg-green-400 p-2 w-28 text-center rounded-lg my-3': 'bg-red-400 p-2 w-28 text-center rounded-lg my-3'} name="fk_id_estado" ref={register} onChange={(e)=>handlerSaveState({row, e})}>
										<option selected="true" disabled="disabled">{row.estado}</option>
										<option value={0}>Pendiente</option>
										<option value={1}>Pagada</option>
										<option value={2}>Cancelada</option>
									</select>
									</StyledTableRow>
								))} 
								</TableBody>
							</Table>
						</TableContainer>
				</div>
			</div>
			{
				viewDetalleAbonos && 
				<div className="mx-0 flex flex-col w-full md:w-4/5 mt-10 md:mt-0 border-2 p-2 rounded-lg mb-5">
				{
					parseInt(dataInfo?.valor_factura) > parseInt(dataInfo?.total_deuda === null ? 0 : dataInfo?.total_deuda ) && dataInfo?.estado !== 'Pagada' && <div className="m-0 mb-5 flex flex-wrap justify-end">				 
					<Button
						className="text-base"
						variant="contained"
						color="primary"
						size="large"
						className="rounded-sm"
						onClick={() => setOpen(true)}
						startIcon={<AddCircleOutlineIcon />}
					>
						Crear abono
					</Button>
				</div>
				}
				

				<div className='flex flex-col mb-10'>
					<div className="flex flex-row justify-between">
						<div>
							<div className='flex flex-row'>
							<p className='text-base font-semibold'>Nombre:</p>
							<p className="text-xs ml-3 mt-1 text-gray-700">{dataInfo?.paciente}</p>
							</div>
							<div className='flex flex-row'>
								<p className='text-base font-semibold'>Total deuda:</p>
								<p className="text-xs ml-3 mt-1 text-gray-700">$ {dataInfo?.valor_factura}</p>
							</div>
							<div className='flex flex-row'>
								<p className='text-base font-semibold'>Total abonado:</p>
								<p className="text-xs ml-3 mt-1 text-gray-700">$ {dataInfo?.total_abonos ? dataInfo?.total_abonos : '---'}</p>
							</div>
							<div className='flex flex-row'>
								<p className='text-base font-semibold'>Pendiente por pagar:</p>
								<p className="text-xs ml-3 mt-1 text-gray-700">$ {dataInfo?.total_deuda ? dataInfo?.total_deuda : '---'}</p>
							</div>
						</div>
						<div>
							<div className='flex flex-row'>
								<p className='text-base font-semibold'>Factura No:</p>
								<p className="text-xs w-44 ml-3 mt-1 text-gray-700">{dataInfo?.numero_factura ? dataInfo?.numero_factura : "No hay nota para esta factura"}</p>
							</div>
							<div className='flex flex-row'>
								<p className='text-base font-semibold'>Nota:</p>
								<p className="text-xs w-44 ml-3 mt-1 text-gray-700">{dataInfo?.nota ? dataInfo?.nota : "No hay nota para esta factura"}</p>
							</div>
						</div>
					</div>
					<p className="text-2xl w-full text-center">Total Abonos</p>
					<div className="overflow-y-auto ml-0 pr-2 w-full mx-3 h-60">
						<TableContainer component={Paper}>
							<Table className={classes.table} size="small" aria-label="a dense table">
								<TableHead>
								<TableRow>
									<StyledTableCell align="center">Fecha</StyledTableCell>
									<StyledTableCell align="center">Abono</StyledTableCell>
									<StyledTableCell align="center">Nota</StyledTableCell>
								</TableRow>
								</TableHead>
								<TableBody>
								{allAbonos?.map((row, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell align="center" className="flex justify-center items-center">
											<button><DeleteIcon onClick={()=> handlerEliminarAbono(row)}/></button>
											<p className=''>{row.fecha}</p>
										</StyledTableCell>
										<StyledTableCell align="center">$ {row.valor}</StyledTableCell>
										<StyledTableCell align="center">{row.nota}</StyledTableCell>
									</StyledTableRow>
								))} 
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			</div>
			}
			{
				viewFactura && <Factura facturaPersona={facturaPersona && facturaPersona[0]} detalleFactura={detalleFactura}/>
			
			}
			
		<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={`${classes.paper} mx-2 md:mx-20 flex flex-col px-20`}
          >
            <h2 className="text-3xl text-center" id="titulo-registro">
              Registrar abono
            </h2>
			<div className="">
			<form
				className="flex flex-col w-9/12 mx-16 "
				onSubmit={handleSubmit(onSubmit)}
				>
			
				<input
					className="border-2 border-gray-400 rounded-md m-3 text-xl pl-2"
					name="abono"
					placeholder='Valor a registrar'
					ref={register}
					/>
				<textarea className="border-b-4 border-2 w-full border-gray-400 rounded-md mb-3 px-2 h-20 shadow-lg" 
						name="note" 
						placeholder="Nota"
						//onChange={(e)=> handleTextarea(e)}
						ref={register}/>  				
				<input
					disabled={disabledBotonEnviarAbono}
					className={disabledBotonEnviarAbono ? "bg-gray-500 py-1 px-5 rounded-md text-white font-semibold":"bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"}
					type="submit"
				/>
			</form>
			</div>
            
          </div>
        </Fade>
      </Modal>
		
	</div>
  );
};

