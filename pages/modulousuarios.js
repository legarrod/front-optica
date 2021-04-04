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
  
	const getAllData = ()=>{
		const url = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
		getData(url, setListaPacientes); 
	}
  
	useEffect(() => {
		const response = getLogin();
		setUser(response)  
	  getAllData();
	}, []);

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
				  <ModuloUsuarios listaPacientes={listaPacientes} getAllData={getAllData}/>
			  </div>
			  </div> </div>
			}
			
     
		</div>
	)
}
