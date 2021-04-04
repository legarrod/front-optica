import React from 'react';
import Head from "next/head";
import styles from "../styles/Home.module.css";
import LoginForm from './components/LoginForm/LoginForm'


export default function login() {
	return (
		<div className="" style={{backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/29/11/09/woman-1869116_960_720.jpg')", position: 'absolute', left: 0, top:0, opacity: 0.5, height: '100vh', width: '100%', zIndex: '-100'}}>
		<Head>
		  <title>Login optica</title>
		  <link rel="icon" href="/favicon.ico" />
		</Head>
		
		<main className={styles.main}>
		  <div className="px-2 md:px-20">
		  <LoginForm/>
		  </div>
		  
		</main>
  
		<footer className={styles.footer}></footer>
	  </div>
		
	)
}
