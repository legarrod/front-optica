import React, {useState} from 'react'
import MenuNav from "./components/MenuNav/MenuNav";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CustomizedTableProducto from "../pages/modules/Productos/TablaProducto/TablaProductos"



export default function Productos() {


	  
	return (
		<div>
			<MenuNav />
			<div className="mt-10">
      
			<div className="mx-10 flex flex-wrap justify-end">
			{/* <DayPickerInput  onDayChange={day => setFechaFilter(getDate(day))} /> */}
			
			</div>
			<div className="px-3 sm:px-10 md:px-20">
				 <CustomizedTableProducto/>
			</div>
       
      </div>
     

       {/* <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openRegCita}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRegCita}>
          <div
            className={`${classes.paper} mx-2 md:mx-20 flex flex-wrap justify-center`}
          >
            <h2 className="text-3xl" id="titulo-registro">
              Crear cita
            </h2>
            <FormRegCita setOpen={setOpenRegCita} cedulaPaciente={cedulaPaciente}/>
          </div>
        </Fade>
      </Modal> */}
		</div>
	)
}
