import React from 'react';
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
import {getHour} from "../../../utils/utils"

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


export default function TablaCitas({data}) {
	let hoy = new Date();
	const classes = useStyles();
	
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
						<StyledTableCell align="center">{row.hora !== '' ? row.hora : 'Sin hora'}</StyledTableCell>
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
