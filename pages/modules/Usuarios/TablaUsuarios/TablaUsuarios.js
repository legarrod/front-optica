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



const useStyles = makeStyles((theme)=>({
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
  modalContainer: {
	display: 'none', 
	position: 'fixed', 
	zIndex: 1,
	paddingTop: '100px',
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
	overflow: 'auto',
	backgroundColor: '#fefefe',
	margin: 'auto',
	padding: '20px',
	border: '1px solid lightgray',
	borderTop: '10px solid #58abb7',
	color: '#aaaaaa',
	float: 'right',
	fontSize: '28px',
	fontWeight: 'bold',
	textDecoration: 'none',
	cursor: 'pointer',
}
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



export default function CustomizedTables({listaPacientes, getAllData}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] =useState();
  const urlCitas = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
  const rows = listaPacientes;
  const [accion, setAccion] = useState('');
  const [cedulaPaciente, setCedulaPaciente] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const consultarCliente = () => {
    swal({
      text: "Consultar paciente",
      content: "input",
      button: {
        text: "Buscar!",
        closeModal: false,
      },
    })
      .then((name) => {
        setCedulaPaciente(name);
        if (!name){
			swal({
			  text: "Por favor ingrese un número de cedula",
			  button: {
				text: "De acuerdo!",
			  }
			})
			throw null;
		  }
        return fetch(`${urlCitas}/${name}`);
      })
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        const paciente = json;

        if (!paciente) {
          return swal("No paciente was found!");
        }
        if (paciente === "No existen paciente con esta cedula") {
          swal("Paciente no encontrado", "Vamos a crearlo", "error");
		  setOpen(true);
		  setAccion('crear')

        } else {
          const name = paciente.nombre;
          const apellidos = paciente.apellidos;
          swal({
            title: "El paciente ya existe",
            text: `${name} ${apellidos}`,
          });
          setOpenRegCita(true);
        }
      });
  };

	const actualizarCliente =(cc)=> {
		let user = rows?.filter(item=> item.cedula === cc);
		
		setDataUser(user && user[0])
		setOpen(true), 
		setAccion('actualizar'), 
		setCedulaPaciente(cc)};
  return (
	
	< div className="flex flex-col md:flex-row w-full">
		<div className="w-full px-8">
			<div className="m-0 mb-5 flex flex-wrap justify-end">
				<Button
					variant="contained"
					color="primary"
					size="large"
					className="rounded-sm"
					onClick={() => consultarCliente()}
					startIcon={<AddCircleOutlineIcon />}
				>
					Crear paciente
				</Button>
			</div>
			<div className="overflow-y-auto w-full mx-3 h-5/6">
				<TableContainer component={Paper}>
				<Table aria-label="customized table">
					<TableHead>
					<TableRow>
					<StyledTableCell align="center">Opciones</StyledTableCell>
						<StyledTableCell align="center">Cedula</StyledTableCell>
						<StyledTableCell align="center">Nombre</StyledTableCell>
						<StyledTableCell align="center">Apellidos</StyledTableCell>
						<StyledTableCell align="center">Fecha nacimiento</StyledTableCell>
						<StyledTableCell align="center">Telefono</StyledTableCell>
						<StyledTableCell align="center">Ocupacion</StyledTableCell>
						<StyledTableCell align="center">Direccion</StyledTableCell>
						<StyledTableCell align="center">Ciudad</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{rows?.length >0 && rows?.map((row) => (
						<StyledTableRow key={row.id}>
						<StyledTableCell align="center">
							<div className="flex flex-row">
							<button><EditIcon onClick={() => actualizarCliente(row.cedula)}/></button>
						
							</div>
						</StyledTableCell>
						<StyledTableCell align="left">{row.cedula}</StyledTableCell>
						<StyledTableCell align="left">{row.nombre}</StyledTableCell>
						<StyledTableCell align="left">{row.apellidos}</StyledTableCell>
						<StyledTableCell align="left">{row.fecha_nacimiento}</StyledTableCell>
						<StyledTableCell align="left">{row.celular}</StyledTableCell>
						<StyledTableCell align="left">{row.ocupacion}</StyledTableCell>
						<StyledTableCell align="left">{row.direccion}</StyledTableCell>
						<StyledTableCell align="left">{row.nombre_ciudad}</StyledTableCell>
						</StyledTableRow>
					))}
					</TableBody>
				</Table>
				</TableContainer>
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
			timeout: 500,}}>
			
				<div
					className={`${classes.paper} mx-2 md:mx-20 flex flex-wrap justify-center`}
				>
					<h2 className="text-3xl" id="titulo-registro">
					Registrar usuario
					</h2>
					<FormRegistroUsuario setOpen={setOpen} accion={accion} dataUser={dataUser} setCedulaPaciente={setCedulaPaciente} cedulaPaciente={cedulaPaciente} getAllData={getAllData}/>
				</div>
			
		</Modal>
	</div>	 
  );
};

