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
  const [dataUser, setDataUser] =useState();
  const urlCitas = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
  const [accion, setAccion] = useState('');
  const [cedulaPaciente, setCedulaPaciente] = useState();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const urlGetProducts = `${process.env.API_OBTENER_TODOS_LOS_PRODUCTOS}`;
  const [allProducts, setAllProducts] = useState();
  const [obtenerData, setObtenerData] = useState();
  const { register, handleSubmit } = useForm();

  const handleClose = () => {
	  setOpen(false);
	};
 
  const consultarProducto = () => {
          setOpen(true)
  };


  const getProduct = async (urlGetProducts, setAllProducts = null) => {
	console.log(urlGetProducts);
  try {
	const data = await axios.get(urlGetProducts, setAllProducts);
	if (data.data) {
	  setAllProducts(data.data);
	  
	}
  } catch (error) {
	console.log(error);
  }
  //return axios.post(url, formData, config);
}


	const actualizarCliente =(value)=> {
		console.log(value);
		// let user = allProducts?.filter(item=> item.idproducto === value.idproducto);
		//setDataUser(user && user[0])
		setData(value)
		setAccion('actualizar')
		//mx-16(id)
	};
	
	const refresData =()=>{
		setObtenerData(getProduct(urlGetProducts, setAllProducts))
	}  
	const onSubmit = (data) => {
		let newdata = Object.assign(data, files);
	   
	  postProducto(url, data, succes)
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
										<button><EditIcon onClick={() => actualizarCliente(row)}/></button>
									
										</div>
									</StyledTableCell>
									<StyledTableCell align="left">{row.nombre}</StyledTableCell>
									<StyledTableCell align="left">{row.descripcion}</StyledTableCell>
									<StyledTableCell align="left">foto</StyledTableCell>
									</StyledTableRow>
								))} 
								</TableBody>
							</Table>
						</TableContainer>
					</div>
			</div>
		
		<div className="mx-5 flex flex-col w-full md:w-2/5 ">
			<p className="text-2xl w-full ">Actualizar producto</p>
			<form
				className="flex flex-col w-9/12 mx-16 md:mx-0"
				onSubmit={handleSubmit(onSubmit)}
				>
			
				<input
					className="border-2 border-gray-400 rounded-md m-3 text-xl"
					name="codigo"
					placeholder="Codigo"
					value={data?.codigo}
					ref={register}
					/>
					<input
					className="border-2 border-gray-400 rounded-md m-3 text-xl"
					name="nombre"
					placeholder="Nombre"
					value={data?.nombre}
					ref={register}
					/>
					<input
					className="border-2 border-gray-400 rounded-md m-3 text-xl"
					name="descripcion"
					placeholder="Descripcion"
					value={data?.descripcion}
					ref={register}
					/>
				<div>
						<label htmlFor="upload-button">
						<CloudDownloadIcon className="ml-10" style={{ fontSize: 50 }}/>
						</label>
						<input type="file" id="upload-button" style={{ display: 'none' }} onChange={(e)=>convertirBase(e.target.files)} />
						<p className="ml-10 text-sm">Upload photo</p>
					</div>
			
				
				<input
					className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
					type="submit"
				/>
			</form>

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

