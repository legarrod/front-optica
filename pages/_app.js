import React, {useMemo, useState, useEffect} from 'react'
import {useRouter} from 'next/router';
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import AuthContext from '../context/AuthContext';
import {getLogin} from './api/user';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const login = (token = null, data)=>{
    localStorage.setItem('isLogin', JSON.stringify(data))
    router.replace("/")
  }

  const authData = useMemo(
    () =>({auth: user,
          login,
          logout: ()=> null,
          setReloadUser: ()=> null}),[])

  useEffect(() => {
    const response = getLogin();
    setUser(JSON.parse(response))   
  }, [])
  
  return <AuthContext.Provider value={authData}>
            <Component {...pageProps} />
          </AuthContext.Provider> 
}

export default MyApp;
