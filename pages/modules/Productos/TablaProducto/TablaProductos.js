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
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import { useSpring, animated } from "react-spring/web.cjs";
import FormRegistroUsuario from "../../ControlCitas/FormRegistroUsuario/FormRegistroUsuario";
import { getData, post } from '../../../api/AsyncHttpRequest';
import FormCrearproducto from "../FormCrearProducto";
import axios from "axios";
import { useForm } from "react-hook-form";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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


export default function CustomizedTableProducto() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const urlGetProducts = `${process.env.API_OBTENER_TODOS_LOS_PRODUCTOS}`;
  const urlUpdateProducts = `${process.env.API_ACTUALIZAR_TODOS_LOS_PRODUCTOS}`;
  const urlDeleteProdcto = `${process.env.API_ELIMINAR_PRODUCTO}`;
  const [allProducts, setAllProducts] = useState();
  const [obtenerDataImg, setObtenerDataImg] = useState(null);
  const [codigoProducto, setCodigoProducto] = useState();
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState(null);
  const [linkFoto, setLinkFoto] = useState();
  const [viewUpdateInfo, setViewUpdateInfo] = useState(false);

  const handleClose = () => {
	  setOpen(false);
	};
 
  const consultarProducto = () => {
          setOpen(true)
  };


  	const getProduct = async (urlGetProducts, setAllProducts = null) => {
		try {
			const data = await axios.get(urlGetProducts, setAllProducts);
			if (data.data) {
			setAllProducts(data.data);
			
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
		setViewUpdateInfo(true)
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
		console.log(files);
		let dataExtra = {idproducto: parseInt(codigoProducto), imagen: files !== null ? files : linkFoto}
		let newdata = Object.assign(data, files, dataExtra);
		putProducto(urlUpdateProducts, newdata)
	};

	useEffect(() => {
		getProduct(urlGetProducts, setAllProducts)
		refresData();
	}, [])

  return (
	< div className="flex flex-col md:flex-row w-full">
			<div className="w-full px-8">
				<div className="m-0 mb-5 flex flex-wrap justify-end">
						<Button
							variant="contained"
							color="primary"
							size="large"
							className="rounded-sm"
							onClick={() => consultarProducto()}
							startIcon={<AddCircleOutlineIcon />}
						>
							Crear productos
						</Button>
					</div>
					<div className="overflow-y-auto w-full mx-3 h-5/6">
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="customized table">
								<TableHead>
								<TableRow>
								<StyledTableCell align="center">Codigo</StyledTableCell>
									<StyledTableCell align="center">Nombre</StyledTableCell>
									<StyledTableCell align="center">Descripcio</StyledTableCell>
									<StyledTableCell align="center">Foto</StyledTableCell>
								</TableRow>
								</TableHead>
								<TableBody>
								{allProducts?.map((row) => (
									<StyledTableRow key={row.id}>
									<StyledTableCell align="center">
										<div className="flex flex-row">
										<button><EditIcon onClick={() => actualizarProducto(row)}/></button>
										<button><DeleteForeverIcon onClick={() => eliminarProducto(row)}/></button>
									
										</div>
									</StyledTableCell>
									<StyledTableCell align="left">{row.nombre}</StyledTableCell>
									<StyledTableCell align="left">{row.descripcion}</StyledTableCell>
									<StyledTableCell align="left"><img className="h-14 w-auto rounded-full" src={row.imagen} onClick={()=>handlerViewImage(row)}/></StyledTableCell>
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

		{
			viewUpdateInfo && <div className="mx-5 flex flex-col w-full md:w-2/5 mt-10 md:mt-0">
			<p className="text-2xl w-full ">Actualizar producto</p>
			<form
				className="flex flex-col w-9/12 mx-16 md:mx-0"
				onSubmit={handleSubmit(onSubmit)}
				>
			
				<input
					className="border-2 border-gray-400 rounded-md m-3 text-xl"
					name="codigo"
					disabled='true'
					placeholder={data?.codigo}
					ref={register}
					/>
					<input
					className="border-2 border-gray-400 rounded-md m-3 text-xl"
					name="nombre"
					placeholder={data?.nombre}
					ref={register}
					/>
					<input
					className="border-2 border-gray-400 rounded-md m-3 text-xl"
					name="descripcion"
					placeholder={data?.descripcion}
					ref={register}
					/>
				<div>
						<label htmlFor="upload-button">
						<CloudDownloadIcon className="ml-10" style={{ fontSize: 50 }}/>
						</label>
						<input type="file" id="upload-button" style={{ display: 'none' }} onChange={(e)=>convertirBase(e.target.files)} />
						<p className="ml-10 text-sm">Upload photo</p>
						<img className="h-44" src={data?.imagen} />					
				</div>
			
				
				<input
					className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
					type="submit"
				/>
			</form>

		</div>

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
            className={`${classes.paper} mx-2 md:mx-20 flex flex-col justify-center`}
          >
            <h2 className="text-3xl" id="titulo-registro">
              Registrar Producto
            </h2>
			<div className="">
				<FormCrearproducto setOpen={setOpen} refresData={refresData}/>
			</div>
            
          </div>
        </Fade>
      </Modal>
	</div>
  );
};

