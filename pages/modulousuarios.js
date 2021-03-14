import React, {useState, useEffect} from 'react'
import ModuloUsuarios from "./modules/Usuarios"
import MenuNav from "./components/MenuNav/MenuNav";
import { getData } from "./api/AsyncHttpRequest";

export default function modulousuarios() {
	const [allData, setAllData] = useState([]);
  
	const getAllData = ()=>{
	
		const url = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
	  getData(url, setAllData);
	 
	}
  
	useEffect(() => {
	  getAllData();
	}, []);

	return (
		<div>
			<MenuNav />
			<div className="mt-10">
          	<div className="px-3 sm:px-10 md:px-20">
		  	<ModuloUsuarios allData={allData}/>
          </div>
		  </div>
     
		</div>
	)
}
