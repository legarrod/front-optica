import React, {useState, useEffect} from 'react';
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


export default function TablaClientesAbonos() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const urlGetProducts = `${process.env.API_OBTENER_TODOS_LOS_PRODUCTOS}`;
  const urlUpdateProducts = `${process.env.API_ACTUALIZAR_TODOS_LOS_PRODUCTOS}`;
  const urlDeleteProdcto = `${process.env.API_ELIMINAR_PRODUCTO}`;
  const [allProducts, setAllProducts] = useState();
  const [obtenerDataImg, setObtenerDataImg] = useState(null);
  const [codigoProducto, setCodigoProducto] = useState();
  const [files, setFiles] = useState(null);
  const [linkFoto, setLinkFoto] = useState();
  const { register, handleSubmit } = useForm();
 
  let usuarios =[
	{
		cc: 123,
		nombre: 'Juan Cardona',
		estado: 'Pendiente',
		pendiente: 200000,
		totalDeuda: 400000,
		totalAbonos: 200000,
		abonos: [{fecha: '2021-30-01', abono: 20000}, {fecha: '2021-30-05', abono: 20000}, {fecha: '2021-30-02', abono: 50000}, {fecha: '2021-29-10', abono: 30000}, {fecha: '2021-30-05', abono: 20000}, {fecha: '2021-30-02', abono: 110000}, {fecha: '2021-29-10', abono: 85000}]
	},
	{
		cc: 124,
		nombre: 'Jorge Perez',
		estado: 'Pendiente',
		pendiente: 150000,
		totalDeuda: 500000,
		totalAbonos: 350000,
		abonos: [{fecha: '2021-30-01', abono: 50000}, {fecha: '2021-30-05', abono: 80000}]
	},
	{
		cc: 125,
		nombre: 'Camila Henao',
		estado: 'Pendiente',
		pendiente: 200000,
		totalDeuda: 320000,
		totalAbonos: 120000,
		abonos: [{fecha: '2021-30-01', abono: 70000}, {fecha: '2021-30-05', abono: 120000}, {fecha: '2021-30-02', abono: 70000}, {fecha: '2021-29-10', abono: 30000}, {fecha: '2021-30-02', abono: 60000}, {fecha: '2021-29-10', abono: 50000}]
	},
	{
		cc: 126,
		nombre: 'Rocio Cardona',
		estado: 'Pendiente',
		pendiente: 100000,
		totalDeuda: 650000,
		totalAbonos: 500000,
		abonos: [{fecha: '2021-30-01', abono: 50000}]
	},
]
  const handleClose = () => {
	  setOpen(false);
	};
 
  const crearAbono = () => {
          setOpen(true)
  };


  	const getProduct = async (urlGetProducts, setAllProducts = null) => {
		try {
			const data = await axios.get(urlGetProducts, setAllProducts);
			if (data.data) {
			//setAllProducts(data.data);
			setAllProducts(usuarios)
			}
		} catch (error) {
			console.log(error);
		}

	}

	const remove=async(url)=> {
		try {
			const data = await axios.delete(url);
			if (data.data ==="eliminado correctamente") {
				getProduct(urlGetProducts, setAllProducts);	  
			}
		} catch (error) {
			console.log(error);
		}
	}

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

	const actualizarProducto =(value)=> {
		
		setData(value);
		setCodigoProducto(value.idproducto);
		setLinkFoto(value.imagen);
		setObtenerDataImg(null)
	};
	const eliminarProducto =(value)=> {
		remove(`${urlDeleteProdcto}id=${value.idproducto}`)
	};

	const putProducto = async(url, params)=>{
		try {
			const data = await axios.put(url, params);
			if (data) {
				getProduct(urlGetProducts, setAllProducts)
				setViewUpdateInfo(false)
			}
		  } catch (error) {
			console.log(error);
		  }
	}
	
	const handlerViewImage =(row)=>{ 
		setObtenerDataImg({img: row.imagen, name: row.nombre})
		setViewUpdateInfo(false)
	}

	const refresData =()=>{
		getProduct(urlGetProducts, setAllProducts)
	}  
	const onSubmit = (data) => {
		console.log(data);
		// let dataExtra = {idproducto: parseInt(codigoProducto), imagen: files !== null ? files : linkFoto}
		// let newdata = Object.assign(data, files, dataExtra);
		// putProducto(urlUpdateProducts, newdata)
	};

	useEffect(() => {
		getProduct(urlGetProducts, setAllProducts)
		refresData();
	}, [])
	// INSERT INTO `detalle_factura` (`id_detalle`, `id_factura`, `id_producto`, `cantidad`, `valor`) VALUES ('01', '1', '14', '1', '1000'), ('02', '1', '29', '1', '2000');

  return (
	< div className="flex flex-col md:flex-row w-full">
			<div className="w-full px-8">
				
				<div className="overflow-y-auto w-full mx-3 h-5/6">
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
								{allProducts?.map((row) => (
									<StyledTableRow key={row.id}>
									<StyledTableCell align="center">
									
										<button><RemoveRedEyeIcon onClick={() => actualizarProducto(row)}/></button>
									
									</StyledTableCell>
									<StyledTableCell align="center">{row.cc}</StyledTableCell>
									<StyledTableCell align="center">{row.nombre}</StyledTableCell>
									<StyledTableCell align="left"><p className='bg-red-400 p-2 w-40 text-center rounded-lg'>{row.estado}</p></StyledTableCell>
									</StyledTableRow>
								))} 
								</TableBody>
							</Table>
						</TableContainer>
				</div>
			</div>
			{ obtenerDataImg !== null &&
				<div className="mx-5 flex flex-col w-full md:w-2/5 mt-10 md:mt-0">
					<p className="text-center text-blue-800 text-2xl font-semibold">{obtenerDataImg.name}</p>
					<img className="h-80 w-auto border border-gray-700 shadow-lg" src={obtenerDataImg.img} alt="Optica" style={{objectFit: 'cover'}}/>
				</div>
			}

			<div className="mx-5 flex flex-col w-full md:w-2/5 mt-10 md:mt-0">
			<p className="text-2xl w-full text-center">Total Abonos</p>
			<div className="m-0 mb-5 flex flex-wrap justify-end">
						<Button
							variant="contained"
							color="primary"
							size="large"
							className="rounded-sm"
							onClick={() => crearAbono()}
							startIcon={<AddCircleOutlineIcon />}
						>
							Crear abono
						</Button>
				</div>

			<div className='flex flex-col'>
				<div className='flex flex-row'>
					<p className='text-base font-semibold'>Nombre:</p>
					<p className="text-xs ml-3 mt-1 text-gray-700">{data?.nombre}</p>
				</div>
				<div className='flex flex-row'>
					<p className='text-base font-semibold'>Total deuda:</p>
					<p className="text-xs ml-3 mt-1 text-gray-700">{data?.totalDeuda}</p>
				</div>
				<div className='flex flex-row'>
					<p className='text-base font-semibold'>Pendiente por pagar:</p>
					<p className="text-xs ml-3 mt-1 text-gray-700">{data?.pendiente}</p>
				</div>
				<div className='flex flex-row'>
					<p className='text-base font-semibold'>Total abonado:</p>
					<p className="text-xs ml-3 mt-1 text-gray-700">{data?.totalDeuda}</p>
				</div>
				<div className="overflow-y-auto w-full mx-3 h-60">
					<TableContainer component={Paper}>
						<Table className={classes.table} size="small" aria-label="a dense table">
							<TableHead>
							<TableRow>
								<StyledTableCell align="center">Fecha</StyledTableCell>
								<StyledTableCell align="center">Abono</StyledTableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{data?.abonos?.map((row, index) => (
								<StyledTableRow key={index}>
									<StyledTableCell align="center">{row.fecha}</StyledTableCell>
									<StyledTableCell align="center">{row.abono}</StyledTableCell>
								</StyledTableRow>
							))} 
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>

		</div>
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
				<input
					className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
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

