import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import MenuNav from "./components/MenuNav/MenuNav";
import CardIndex from "./components/CardIndex/CardIndex"
export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Sistema Citas Óptica</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuNav />
      <main className={styles.main}>
        <CardIndex />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
