import React, {useEffect, useState} from "react";
import ModuloCitas from "./modules/ControlCitas";
import MenuNav from "./components/MenuNav/MenuNav";
import { getData } from "./api/AsyncHttpRequest";
import {useRouter} from "next/router"
import useAuth from '../hooks/useAuth';
import {getLogin} from './api/user';

export default function citas() {
  const [allData, setAllData] = useState([]);
  const ruta = useRouter()
  const idCita= Object.keys(ruta.query)[0];

  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const {auth} = useAuth(); 

  const getAllData = (idCita)=>{
    if (idCita) {
      const url = `${process.env.API_CITA_POR_PACIENTE}/${idCita}`;
    getData(url, setAllData);
    }
  }

  useEffect(() => {
    const response = getLogin();
       setUser(response)  
    getAllData(idCita);
  }, [idCita]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("./login")
  }
 
  return (
    <div>
      {
        user && <div className="m-0">
      <MenuNav />
      <ModuloCitas allData={allData[0]}/>
        </div>
      }
      
    </div>
  );
}
