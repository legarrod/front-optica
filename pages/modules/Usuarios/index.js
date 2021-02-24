import React from 'react'

import TablaUsuarios from "./TablaUsuarios/TablaUsuarios"

export default function moduloUsuarios({allData}) {
	return (
		<div>
			
			<div className="m-10 mt-20">
			<TablaUsuarios allData={allData}/>
			</div>
		
		</div>
	)
}
