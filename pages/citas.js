import React, {useEffect, useState} from "react";
import ModuloCitas from "./modules/ControlCitas";
import MenuNav from "./components/MenuNav/MenuNav";
import { getData } from "./api/AsyncHttpRequest";
import {useRouter} from "next/router"

export default function citas() {
  const [allData, setAllData] = useState([]);
  const ruta = useRouter()
  const idCita= Object.keys(ruta.query)[0];
  
  const getAllData = (idCita)=>{
    if (idCita) {
      const url = `${process.env.API_CITA_POR_PACIENTE}/${idCita}`;
    getData(url, setAllData);
    }
  }

  useEffect(() => {
    
    getAllData(idCita);
  }, [idCita]);
 
  return (
    <div>
      <MenuNav />

      <ModuloCitas allData={allData[0]}/>
    </div>
  );
}
