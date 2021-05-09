import Head from "next/head";
import {useRouter} from 'next/router';
import React, {useState, useEffect} from "react";
import styles from "../styles/Home.module.css";
import MenuNav from "./components/MenuNav/MenuNav";
import CardIndex from "./components/CardIndex/CardIndex"
import useAuth from '../hooks/useAuth';
import {getLogin} from './api/user';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Home() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const {auth} = useAuth(); 

  useEffect(() => {
        const response = getLogin();
       setUser(response)   
  }, [])

  if (user === undefined) return null;


  if (!auth && !user) {
    router.replace("./login")
  }

  return (
   
    <div className="">
      {
        user ? <div className='m-0'>
        <Head>
        <title>Sistema Citas Óptica</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuNav />
      <main className={styles.main}>
        <div className="px-2 md:px-20">
          <CardIndex />
        </div>
        
      </main>

      <footer className={styles.footer}></footer>
        </div> : <CircularProgress />
      }
    </div>
  )
}
