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
		<div className="w-screen h-screen bg-black py-6 bg-opacity-25 absolute z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
			<div className='overflow-auto w-11/12 h-full bg-white p-5 flex flex-wrap rounded-xl'>
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
									<div className="flex flex-wrap justify-center items-center"> 
										<div className="flex flex-col justify-center w-2/5 mx-1 my-1 border bottom-2 border-blue-500 rounded-lg p-1 items-start">
											<h2 className="text-xl font-semibold text-center w-full">ESFERICO</h2>
											<div className="flex flex-row m-1 ">
													<p className="text-xs font-semibold mr-2">RX EN USO DERECHO:</p>
													<p className="text-xs ">{citaPaciente.lejos_esferico_derecho}</p>
												</div>
												<div className="flex flex-row m-1 justify-center items-center">
													<p className="text-xs font-semibold mr-2">RX EN USO IZQUIERDO:</p>
													<p className="text-xs ">{citaPaciente.lejos_esferico_izquierdo}</p>
												</div>
												<div className="flex flex-row m-1 justify-center items-center">
													<p className="text-xs font-semibold mr-2">RX FINAL DERECHO:</p>
													<p className="text-xs ">{citaPaciente.cerca_esferico_derecho}</p>
												</div>
												<div className="flex flex-row m-1 justify-center items-center">
													<p className="text-xs font-semibold mr-2">RX FINAL IZQUIERDO:</p>
													<p className="text-xs ">{citaPaciente.cerca_esferico_izquierdo}</p>
												</div>
												{/* <div className="flex flex-row m-1 justify-center items-center">
													<p className="text-xs font-semibold mr-2">Esferico actual derecho:</p>
													<p className="text-xs ">{citaPaciente.actual_esferico_derecho}</p>
												</div>
												<div className="flex flex-row m-1 justify-center items-center">
													<p className="text-xs font-semibold mr-2">Esferico actual izquiero:</p>
													<p className="text-xs ">{citaPaciente.actual_esferico_izquierdo}</p>
											</div> */}
										
										</div>

										<div className="flex flex-col justify-center w-2/5 mx-1 my-1 border bottom-2 border-blue-500 rounded-lg p-1 items-start">
										<h2 className="text-xl font-semibold text-center w-full">CILINDRO</h2>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX EN USO DERECHO:</p>
												<p className="text-xs ">{citaPaciente.lejos_cilindro_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX EN USO IZQUIERDO:</p>
												<p className="text-xs ">{citaPaciente.lejos_cilindro_izquierdo}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX FINAL DERECHO:</p>
												<p className="text-xs ">{citaPaciente.cerca_cilindro_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX FINAL IZQUIERDO:</p>
												<p className="text-xs ">{citaPaciente.cerca_cilindro_izquierdo}</p>
											</div>
											{/* <div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">Cilindrico actual derecho:</p>
												<p className="text-xs ">{citaPaciente.actual_cilindro_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">Cilindrico actual izquiero:</p>
												<p className="text-xs ">{citaPaciente.actual_cilindro_izquierdo}</p>
											</div> */}
										</div>
										
										<div className="flex flex-col justify-center w-2/5 mx-1 my-1 border bottom-2 border-blue-500 rounded-lg p-1 items-start">
										<h2 className="text-xl font-semibold text-center w-full">EJE</h2>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX EN USO DERECHO:</p>
												<p className="text-xs ">{citaPaciente.lejos_eje_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX EN USO IZQUIERDO:</p>
												<p className="text-xs ">{citaPaciente.lejos_eje_izquierdo}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX FINAL DERECHO:</p>
												<p className="text-xs ">{citaPaciente.cerca_eje_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX FINAL IZQUIERDO:</p>
												<p className="text-xs ">{citaPaciente.cerca_eje_izquierdo}</p>
											</div>
											{/* <div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">Eje actual derecho:</p>
												<p className="text-xs ">{citaPaciente.actual_eje_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">Eje actual izquiero:</p>
												<p className="text-xs ">{citaPaciente.ctual_eje_izquierdo}</p>
											</div> */}
										</div>
										<div className="flex flex-col justify-center w-2/5 mx-1 my-1 border bottom-2 border-blue-500 rounded-lg p-1 items-start">
										<h2 className="text-xl font-semibold text-center w-full">ADD</h2>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX EN USO DERECHO:</p>
												<p className="text-xs ">{citaPaciente.lejos_add_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX EN USO IZQUIERDO:</p>
												<p className="text-xs ">{citaPaciente.lejos_add_izquierdo}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX FINAL DERECHO:</p>
												<p className="text-xs ">{citaPaciente.cerca_add_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX FINAL IZQUIERDO:</p>
												<p className="text-xs ">{citaPaciente.ccerca_add_izquierdo}</p>
											</div>
											{/* <div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">A.V actual derecho:</p>
												<p className="text-xs ">{citaPaciente.actual_av_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">A.V actual izquiero:</p>
												<p className="text-xs ">{citaPaciente.actual_av_izquierdo}</p>
											</div> */}

										</div>
										<div className="flex flex-col justify-center w-2/5 mx-1 my-1 border bottom-2 border-blue-500 rounded-lg p-1 items-start">
										<h2 className="text-xl font-semibold text-center w-full">A.V.</h2>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX EN USO DERECHO:</p>
												<p className="text-xs ">{citaPaciente.lejos_av_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX EN USO IZQUIERDO:</p>
												<p className="text-xs ">{citaPaciente.lejos_av_izquierdo}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX FINAL DERECHO:</p>
												<p className="text-xs ">{citaPaciente.cerca_av_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">RX FINAL IZQUIERDO:</p>
												<p className="text-xs ">{citaPaciente.cerca_av_izquierdo}</p>
											</div>
											{/* <div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">A.V actual derecho:</p>
												<p className="text-xs ">{citaPaciente.actual_av_derecho}</p>
											</div>
											<div className="flex flex-row m-1 justify-center items-center">
												<p className="text-xs font-semibold mr-2">A.V actual izquiero:</p>
												<p className="text-xs ">{citaPaciente.actual_av_izquierdo}</p>
											</div> */}

										</div>
										
									</div>
									
								</div>
				}
				<div className="w-full flex justify-end">
				<Button
					variant="contained"
					color="secondary"
					size="large"
					className="rounded-sm h-11"
					style={{ marginTop: 4}}
					onClick={()=>setVerHistoria(false)}
					>X
				</Button>
				</div>
			</div>
			
			
		</div>
	)
}
