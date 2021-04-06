import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import axios from "axios";
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function ResumenHistoria({setVerHistoria}) {
	const urlObtenercitasporpaciente = `${process.env.API_CITAS_POR_CEDULA}`;
	const [dataCitaPaciente, setDataCitaPaciente] = useState();
	const [cedulaPaciente, setCedulaPaciente] = useState();
	const [viewCita, setViewCita] = useState(false)
	const [citaPaciente, setCitaPaciente] = useState({});

	const getCitas = async (urlObtenercitasporpaciente, setDataCitaPaciente = null) => {

		try {
			const data = await axios.get(urlObtenercitasporpaciente, setDataCitaPaciente);
			
			if (data?.data?.data) {
			//setAllProducts(data.data);
			setDataCitaPaciente(data.data.data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handlerCedula =(e)=>{
		setCedulaPaciente(e.target.value);
	}

	const handlerViewCita =(data)=>{
		setCitaPaciente(data)
		setViewCita(true)
	}
	const handlerItemSearch =()=>{
		
		getCitas(`${urlObtenercitasporpaciente}${cedulaPaciente}`, setDataCitaPaciente)
	
	}
	return (
		<div className="w-screen h-screen bg-black bg-opacity-25 absolute z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
			<div className='w-11/12 bg-white p-5 flex flex-wrap rounded-xl'>
				<div>
					<div className='flex flex-wrap'>
						<input className="bg-white h-10 rounded-lg border-gray-800 border-2 my-0 " 
							placeholder="Numero de cedula" 
							autoFocus 
							onChange={(e)=>handlerCedula(e)}
							style={{ marginTop: 4}}>
						</input>
						<div className='mx-2 my-0'>
							<Button
								variant="contained"
								color="primary"
								size="large"
								className="rounded-sm"
								style={{ marginTop: 4}}
								onClick={()=>handlerItemSearch()}
								>Buscar historia
							</Button>
							
						</div>
					</div>
					<div>
						{
							dataCitaPaciente && dataCitaPaciente.map((item, index)=>(<div className="flex flex-row mt-2"><p key={index} className="mr-2">{item.fecha_cita}</p><VisibilityIcon onClick={()=>handlerViewCita(item)}/></div>))
						}
					</div>
				</div>
				
				{
				viewCita && <div className="ml-5 w-3/5 border-2 p-5 rounded-lg">
									<div className="flex flex-row">
										<div>
											<p className="text-xl font-semibold mr-2">{`${citaPaciente.nombre} ${citaPaciente.apellidos}`}</p>
											<p className="text-sm text-gray-700 my-1">{citaPaciente.cedula}</p>
											<p className="text-sm text-gray-700 my-1">{citaPaciente.celular}</p>
											<p className="text-sm text-gray-700 my-1">{citaPaciente.ocupacion}</p>
											<p className="text-sm text-gray-700 my-1">{citaPaciente.direccion}</p>
										</div>
										<div>
											<textarea className="border-b-4 ml-4 border-2 w-full border-gray-400 rounded-md mb-3 px-2 h-20 shadow-lg" 
												name="note" 
												placeholder="No hay observacion"
												value={citaPaciente.observaciones}
												//onChange={(e)=> handleTextarea(e)}
											/> 
										</div>
									</div>
									<div className="flex flex-wrap "> 
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">Anamnesis:</p>
											<p>{citaPaciente.anamnesis}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">Biomicrodcopia:</p>
											<p>{citaPaciente.biomicrodcopia}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_rx_uso:</p>
											<p>{citaPaciente.od_rx_uso}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_rx_uso:</p>
											<p>{citaPaciente.oi_rx_uso}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_ap:</p>
											<p>{citaPaciente.oi_ap}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_af:</p>
											<p>{citaPaciente.oi_af}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_ap:</p>
											<p>{citaPaciente.od_ap}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_af:</p>
											<p>{citaPaciente.od_af}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_avvlsc:</p>
											<p>{citaPaciente.od_avvlsc}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_avvpsc:</p>
											<p>{citaPaciente.od_avvpsc}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_avccvt:</p>
											<p>{citaPaciente.od_avccvt}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_avccvp:</p>
											<p>{citaPaciente.od_avccvp}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_refraccion:</p>
											<p>{citaPaciente.od_refraccion}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">od_rx_final:</p>
											<p>{citaPaciente.od_rx_final}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_avvlsc:</p>
											<p>{citaPaciente.oi_avvlsc}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_avvpsc:</p>
											<p>{citaPaciente.oi_avvpsc}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_avccvt	:</p>
											<p>{citaPaciente.oi_avccvt	}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_avccvp:</p>
											<p>{citaPaciente.oi_avccvp}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_refraccion:</p>
											<p>{citaPaciente.oi_refraccion}</p>
										</div>
										<div className="flex flex-row m-1">
											<p className="text-xs font-semibold mr-2">oi_rx_final:</p>
											<p>{citaPaciente.oi_rx_final}</p>
										</div>

									</div>
									
								</div>
				}
				<div className="w-full flex justify-end">
				<Button
					variant="contained"
					color="secondary"
					size="large"
					className="rounded-sm"
					style={{ marginTop: 4}}
					onClick={()=>setVerHistoria(false)}
					>X
				</Button>
				</div>
			</div>
			
			
		</div>
	)
}
