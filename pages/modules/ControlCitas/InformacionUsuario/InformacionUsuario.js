import React from "react";

export default function InformacionUsuario() {
  return (
    <div className="p-1 md:p-1 mx-2 md:m-5 flex flex-wrap w-full justify-center">
      <div className="mx-2 md:mx-10">
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Nombre:</p>
          <p className="ml-3 text-lg">Informacion</p>
        </div>
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Fecha nacimiento:</p>
          <p className="ml-3 text-lg">Informacion</p>
        </div>
      </div>
      <div className="mx-2 md:mx-10">
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Celular:</p>
          <p className="ml-3 text-lg">Informacion</p>
        </div>
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Direccion:</p>
          <p className="ml-3 text-lg">Informacion</p>
        </div>
      </div>
      <div className="mx-2 md:mx-10">
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Ocupaciopn:</p>
          <p className="ml-3 text-lg">Informacion</p>
        </div>
        <div className="flex flex-wrap mt-1 ml-5">
          <p className="text-lg font-bold">Cedula:</p>
          <p className="ml-3 text-lg">Informacion</p>
        </div>
      </div>
    </div>
  );
}
