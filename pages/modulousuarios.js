import React, {useState, useEffect} from 'react'
import ModuloUsuarios from "./modules/Usuarios"
import MenuNav from "./components/MenuNav/MenuNav";
import { getData } from "./api/AsyncHttpRequest";

import {useRouter} from "next/router"
import useAuth from '../hooks/useAuth';
import {getLogin} from './api/user';

export default function modulousuarios() {
	const [listaPacientes, setListaPacientes] = useState([]);

	const [user, setUser] = useState(undefined);
	const router = useRouter();
	const {auth} = useAuth(); 
  const url = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
  const [buscando, setBuscando] = useState();
  const [cedulaBuscar, setCedulaBuscar] = useState();
  const urlCitas = `${process.env. API_BUSQUEDA_PACIENTES}`;
  
  const responseGetaData =(response)=>{
	setListaPacientes(response)
  }

	const getAllData = (url)=>{
		getData(url, responseGetaData); 
	}

	const handlerBuscarPaciente = (e)=>{
		setBuscando(true)
		setCedulaBuscar(e.target.value)
	}
  
	useEffect(() => {
		const response = getLogin();
		setUser(response) 
		buscando && getAllData(`${urlCitas}${cedulaBuscar}`); 
		!buscando && getAllData(url);
	}, [buscando, cedulaBuscar]);

	if (user === undefined) return null;
	if (!auth && !user) {
	  router.replace("./login")
	}

	return (
		<div>
			{
				user && <div className='m-0'> <MenuNav />
				<div className="mt-10">
				  <div className="px-3 sm:px-10 md:px-20">
				  <input
						style={{ marginTop: 4}}
						className="border-2 border-gray-400 h-10 mt-0 mb-0 rounded-md m-3 text-xl"
						name="nombre"
						placeholder="Buscar paciente"
						onChange={(e)=> handlerBuscarPaciente(e)}
					/>
				  <ModuloUsuarios listaPacientes={listaPacientes} getAllData={getAllData}/>
			  </div>
			  </div> </div>
			}
			
     
		</div>
	)
}
