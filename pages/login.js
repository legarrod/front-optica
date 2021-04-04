import React from 'react';
import Head from "next/head";
import styles from "../styles/Home.module.css";
import LoginForm from './components/LoginForm/LoginForm'


export default function login() {
	return (
		<div className="">
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
