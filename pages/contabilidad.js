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
        <div className="mt-15">
       
          <div className="px-3 sm:px-10 md:px-20">
          <div className="m-0 mb-5 flex flex-wrap justify-end">
						<Button
							variant="contained"
							color="primary"
							size="large"
							className="rounded-sm"
							onClick={() => crearAbono()}
							startIcon={<AddCircleOutlineIcon />}
						>
							Generar factura
						</Button>
				</div>
            <TablaClientesAbonos/>
          </div>
        
        </div>
		</div>
	)
}
