import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Paper from '@material-ui/core/Paper';

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
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function Factura({ facturaPersona, detalleFactura }) {
	const classes = useStyles();
	const handlerImprimirFactura = () => {
		window.print();
	};

	return (
		<div
			id="factura"
			className="mx-0 flex flex-col w-full md:w-4/5 mt-10 md:mt-0 border-2 p-2 rounded-lg mb-5"
		>
			<div className="m-0 mb-5 flex flex-wrap justify-end">
				<Button
					className="text-base"
					variant="contained"
					color="primary"
					size="large"
					className="rounded-sm"
					onClick={() => handlerImprimirFactura()}
					startIcon={<LocalPrintshopIcon />}
				></Button>
			</div>
			<div className="flex flex-col mb-10">
				{facturaPersona && (
					<div className="flex flex-row justify-between">
						<div className="mx-1">
							<div className="flex flex-row">
								<p className="text-sm font-semibold w-16">Nombre:</p>
								<p className="text-xs ml-3 mt-1 text-gray-700">
									{facturaPersona?.paciente}
								</p>
							</div>
							<div className="flex flex-row">
								<p className="text-sm font-semibold w-16">Cedula:</p>
								<p className="text-xs ml-3 mt-1 text-gray-700">
									{facturaPersona?.cedula}
								</p>
							</div>
							<div className="flex flex-row">
								<p className="text-sm font-semibold w-16">Direccion:</p>
								<p className="text-xs ml-3 mt-1 text-gray-700">
									{facturaPersona?.direccion}
								</p>
							</div>
							<div className="flex flex-row">
								<p className="text-sm font-semibold w-16">Telefono:</p>
								<p className="text-xs ml-3 mt-1 text-gray-700">
									{facturaPersona?.celular}
								</p>
							</div>
						</div>
						<div>
							<div className="flex flex-row">
								<p className="text-sm font-semibold w-12">Factura:</p>
								<p className="text-xs w-44 ml-3 mt-1 text-gray-700">
									{facturaPersona?.numero_factura}
								</p>
							</div>
							<div className="flex flex-row">
								<p className="text-sm font-semibold w-12">Fecha:</p>
								<p className="text-xs w-44 ml-3 mt-1 text-gray-700">
									{facturaPersona?.fecha_creacion}
								</p>
							</div>
							<div className="flex flex-row">
								<p className="text-sm font-semibold w-12">Nota:</p>
								<p className="text-xs w-44 ml-3 mt-1 text-gray-700">
									{facturaPersona?.nota
										? facturaPersona?.nota
										: 'No hay nota para esta factura'}
								</p>
							</div>
						</div>
					</div>
				)}

				<div className="overflow-y-auto ml-0 pr-2 w-full mx-3 h-60 mt-5">
					<TableContainer component={Paper}>
						<Table
							className={classes.table}
							size="small"
							aria-label="a dense table"
						>
							<TableHead>
								<TableRow>
									<StyledTableCell align="center">Nombre</StyledTableCell>
									<StyledTableCell align="center">Cantidad</StyledTableCell>
									<StyledTableCell align="center">Sub total</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{detalleFactura &&
									detalleFactura?.map((row, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell align="center">
												<p className="w-20">{row.nombre}</p>
											</StyledTableCell>
											<StyledTableCell align="center">
												$ {row.cantidad}
											</StyledTableCell>
											<StyledTableCell align="center">
												{row.valor_producto}
											</StyledTableCell>
										</StyledTableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<div className="flex flex-row w-full justify-end">
					<p className="text-base font-semibold">Total:</p>
					<p className="text-base font-semibold mr-4 ml-3 text-gray-700">
						{facturaPersona?.valor_factura
							? `$ ` + facturaPersona?.valor_factura
							: `$ 0`}
					</p>
				</div>
			</div>
		</div>
	);
}
