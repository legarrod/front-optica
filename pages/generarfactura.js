import React, {useState, useEffect} from 'react'
import MenuNav from "./components/MenuNav/MenuNav";
import FormCrearFactura from "../pages/modules/Contabilidad/FormCrearFactura/FormCrearFactura"
import {useRouter} from "next/router"
import useAuth from '../hooks/useAuth';
import {getLogin} from './api/user';


export default function Productos() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const {auth} = useAuth(); 

  useEffect(() => {
    const response = getLogin();
       setUser(response)  
  }, []);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("./login")
  }

	  
	return (
		<div>
        <MenuNav />
        <div className="mt-10">
       
          <div className="px-3 sm:px-10 md:px-20">
            <FormCrearFactura/>
          </div>
        
        </div>
		</div>
	)
}
