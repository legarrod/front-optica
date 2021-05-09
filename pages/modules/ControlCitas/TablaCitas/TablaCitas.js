import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { getRowEl } from '@material-ui/data-grid';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Button from "@material-ui/core/Button";
import getDate from "../../../utils/utils"
import { put} from '../../../api/AsyncHttpRequest'
import swal from "sweetalert";

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


export default function TablaCitas({data, horasPorFecha, getHorasFecha}) {
	const hora = ['09:00 am', '09:15 am', '09:30 am', '09:45 am', '10:00 am', '10:15 am', '10:30 am', '10:45 am', '11:00 am', '11:15 am', '11:30 am', '11:45 am', '12:00 pm', '12:15 pm', '12:30 pm', '12:45 pm', '01:00 pm', '01:15 pm', '01:30 pm', '01:45 pm', '02:00 pm', '02:15 pm', '02:30 pm', '02:45 pm', '03:00 pm', '03:15 pm', '03:30 pm', '03:45 pm', '04:00 pm', '04:15 pm', '04:30 pm', '04:45 pm', '05:00 pm', '05:15 pm', '05:30 pm', '05:45 pm']
  	const [horasFiltradas, setHorasFiltradas] = useState([])
	let hoy = new Date();
	const classes = useStyles();
	const [nuevasHorasLimpias, setNuevasHorasLimpias] = useState([])
	const url = `${process.env.API_ACTUALIZAR_HORA_CITA}/`;
	
const callbackResponse = (response)=>{
	if (response?.data?.data) {
		swal("Excelente", "Hora actualizada con exito!", "success")
	  }

}

	const handlerSaveHour = (data)=>{
		let index = data.e.target.selectedIndex;
		let newData = {hora: data.e.target.options[index].text}

		let defaultInfo = {
				id_cita_paciente: parseInt(data?.row?.id_cita_paciente),
				hora: newData.hora,
			
			}
		//console.log(data.row);
		put(url, defaultInfo, callbackResponse)
		
	}

	// const limpiarHoras = (horasPorFecha)=>{
	// 	// horasPorFecha.forEach(item => {
	// 	// 	setNuevasHorasLimpias(...nuevasHorasLimpias, item.hora )
	// 	// });
	// 	horasPorFecha.filter((item)=> setNuevasHorasLimpias(...nuevasHorasLimpias, item.hora))
	// }

	// const nuevasHorasFiltradas = (horasPorFecha)=>{

	// 	limpiarHoras(horasPorFecha)
	// 	//let nuevo = hora.filter((item)=> console.log(item ) )
		
	// }
	// useEffect(() => {
	// 	nuevasHorasFiltradas(horasPorFecha)
	// }, [horasPorFecha])
	// console.log(nuevasHorasLimpias);



	return (
	<div className='mx-2 sm:mx-10 mt-3'>	
		<TableContainer className="h-96" component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
				<TableRow>
					<StyledTableCell align="left">Nombre</StyledTableCell>
					<StyledTableCell align="center">Fecha</StyledTableCell>
					<StyledTableCell align="center">Hora</StyledTableCell>
					<StyledTableCell align="center">Accion</StyledTableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{data && data?.map((row, index) => (
					<StyledTableRow key={index}>
						<StyledTableCell align="left"><p className=''> {`${row.nombre} ${row.apellidos}`}</p></StyledTableCell>
						<StyledTableCell align="center">{row.fecha_cita}</StyledTableCell>
						{/* <StyledTableCell align="center">{row.hora !== '' ? row.hora : 'Sin hora'}</StyledTableCell> */}
						<StyledTableCell align="center">
							<select className=" p-2 w-28 text-center rounded-lg my-3" name="fk_id_estado" onChange={(e)=>handlerSaveHour({row, e})}>
								<option selected="true" disabled="disabled">{row.hora}</option> 
								{
									hora.map((item, ind)=>(
										<option value={ind}>{item}</option>
									))
								}	
							</select>
						</StyledTableCell>
						
						<StyledTableCell align="center"><Link href={`/citas/?${row.id_cita_paciente}`}>
							<a>
							<Button size="small">Ir a consulta</Button>
							</a>
							</Link> </StyledTableCell>
					</StyledTableRow>
				))} 
				</TableBody>
			</Table>
		</TableContainer>
	</div>
	)
}
