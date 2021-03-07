import React from "react";




export default function InformacionUsuario({allData}) {
 
  
 

  return (
    
    <div className="p-1 md:p-1 mx-2 md:m-5 flex flex-wrap w-full ">
      <div className="mx-2 md:mx-10">
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Nombre:</p>
          <p className="ml-3 text-lg">{allData?.nombre + ' ' +allData?.apellidos}</p>
        </div>
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Fecha nacimiento:</p>
          <p className="ml-3 text-lg">{allData?.fecha_nacimiento}</p>
        </div>
      </div>
      <div className="mx-2 md:mx-10">
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Celular:</p>
          <p className="ml-3 text-lg">{allData?.celular}</p>
        </div>
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Direccion:</p>
          <p className="ml-3 text-lg">{allData?.direccion}</p>
        </div>
      </div>
      <div className="mx-2 md:mx-10">
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Ocupaciopn:</p>
          <p className="ml-3 text-lg">{allData?.ocupacion}</p>
        </div>
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Cedula:</p>
          <p className="ml-3 text-lg">{allData?.cedula}</p>
        </div>
      </div>
      
    </div>
  );
}
