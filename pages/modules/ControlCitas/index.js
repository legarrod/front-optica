import React from "react";
import FormularioCitas from "./FormCita";
import InformacionUsuario from "./InformacionUsuario/InformacionUsuario";

export default function index() {
  return (
    <div>
      <InformacionUsuario />
      <FormularioCitas />
    </div>
  );
}
