import React from "react";
import FormularioCitas from "./FormCita";
import InformacionUsuario from "./InformacionUsuario/InformacionUsuario";

export default function index({allData}) {
  
  return (
    <div>
      <InformacionUsuario allData={allData}/>
      <FormularioCitas allData={allData}/>
    </div>
  );
}
