import React from 'react'
import MenuNav from "./components/MenuNav/MenuNav";
import CustomizedTableProducto from "../pages/modules/Productos/TablaProducto/TablaProductos"



export default function Productos() {
	return (
		<div>
        <MenuNav />
        <div className="mt-10">
          <div className="px-3 sm:px-10 md:px-20">
            <CustomizedTableProducto/>
          </div>
        
        </div>
		</div>
	)
}
