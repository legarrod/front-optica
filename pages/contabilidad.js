import React, {useState} from 'react'
import MenuNav from "./components/MenuNav/MenuNav";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TablaClientesAbonos from "../pages/modules/Contabilidad/TablaClientesAbonos/TablaClientesAbonos"



export default function Productos() {


	  
	return (
		<div>
        <MenuNav />
        <div className="mt-10">
          <div className="px-3 sm:px-10 md:px-20">
            <TablaClientesAbonos/>
          </div>
        
        </div>
		</div>
	)
}
