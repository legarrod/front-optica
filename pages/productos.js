import React, {useState, useEffect} from 'react'
import MenuNav from "./components/MenuNav/MenuNav";
import CustomizedTableProducto from "../pages/modules/Productos/TablaProducto/TablaProductos"

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
      {
        user && <div className='m-0'>  <MenuNav />
        <div className="mt-10">
          <div className="px-3 sm:px-10 md:px-20">
            <CustomizedTableProducto/>
          </div>
        
        </div> </div>
      }
       
		</div>
	)
}
