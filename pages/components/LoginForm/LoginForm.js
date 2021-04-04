import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import 'react-day-picker/lib/style.css';

import {useRouter} from "next/router"
import useAuth from '../../../hooks/useAuth';
import {getLogin} from '../../api/user';

export default function LoginForm() {
  const url = `${process.env.API_LOGIN}`;
  const { register, handleSubmit } = useForm();
  const [usuarioNoExiste, setUsuarioNoExiste] = useState(false);
  const {login, auth} = useAuth();

  const [user, setUser] = useState(undefined);
  const router = useRouter();
 
  useEffect(() => {
    const response = getLogin();
   
       setUser(response)  
  }, []);

  if (user === undefined) return null;
  if (user) {
    router.replace("/")
  }

  const postLogin = async (url, formData = null, succes = null) => {
    try {
      const data = await axios.post(url, formData);
     
      if (data?.data === '02') {
        succes("Usuario no existe");
      }else if(data.data.data[0] ){
        succes(data?.data?.data[0]);	
	  }
    } catch (error) {
      console.log(error);
    }
  };

 const succes =(data)=>{
  data !== "Usuario no existe" ? login(null, data) : setUsuarioNoExiste(true)
 };

  const onSubmit = (data) => {
	  postLogin(url, data, succes)
  };

  return (
    <form
      className="flex flex-col w-80 justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
    
	  <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="usuario"
          placeholder="Usuario"
          ref={register}
        />
        <input
        type='password'
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="contrasena"
          placeholder="Contraseña"
          ref={register}
        />
      {usuarioNoExiste && <p className="text-red-700 text-sm mb-2 text-center">Usuario no existe</p>}
      <input
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}
