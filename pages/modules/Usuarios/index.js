import React from 'react'

import TablaUsuarios from "./TablaUsuarios/TablaUsuarios"

export default function moduloUsuarios({listaPacientes, getAllData}) {
	return (
	
		<TablaUsuarios listaPacientes={listaPacientes} getAllData={getAllData}/>

	
	)
}
