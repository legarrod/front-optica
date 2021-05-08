import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { post, put } from "../../../api/AsyncHttpRequest";
import swal from "sweetalert";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormRegistroUsuario({
  setOpen,
  setOpenRegCita,
  setCedulaPaciente,
  cedulaPaciente,
  accion,
  dataUser,
  getAllData,
}) {
  const classes = useStyles();
  let hoy = new Date();
  let fechaRegistro = { fecha_registro: hoy };
  const url = `${process.env.API_GUARDAR_PACIENTE}`;
  const urlPut = `${process.env.API_ACTUALIZAR_INFORMACION_DEL_PACIENTE}`;
  const { register, handleSubmit, control } = useForm();
  const [disabledButton, setDisabledButton] = useState(false);

  const setDataResponse = (data) => {
    setDisabledButton(false);
    if (data.data === "Paciente agregado correctamente") {
      swal("Excelente", "Paciente creado", "success");
      setOpen(false);
      getAllData();
      if (!accion) {
        getAllData();
        setOpen(false);
        setOpenRegCita(true);
      }
    } else if (data.data === "Paciente actualizado correctamente") {
      swal("Excelente", "Paciente actualizado correctamente", "success");
      getAllData();
      setOpen(false);
    }
  };

  const onSubmit = (data) => {
    if (accion === "actualizar") {
      setDisabledButton(true);
      put(urlPut, {...data, id: parseInt(dataUser.id)}, setDataResponse);
    } else if (accion === "crear") {
      setDisabledButton(true);
      let nombre = document.getElementById("nombre").value;
      //let apellidos = document.getElementById("apellidos").value;

    if (accion === "actualizar") {
      setDisabledButton(true);
      put(urlPut, {...data, id: parseInt(dataUser.id)}, setDataResponse);
    } else if (accion === "crear") {
      setDisabledButton(true);
      let nombre = document.getElementById("nombre").value;
      //let apellidos = document.getElementById("apellidos").value;
      let cedula = document.getElementById("cedula").value;
      let fechaNacimiento = document.getElementById("fecha_nacimiento").value;
      let celular = document.getElementById("celular").value;
      let direccion = document.getElementById("direccion").value;
      // let ciudad = document.getElementById("ciudad");
      let ocupacion = document.getElementById("ocupacion").value;
      if (
        nombre === "" ||
        // apellidos === "" ||
        cedula === "" ||
        fechaNacimiento === "" ||
        celular === "" ||
        direccion === "" ||
        ocupacion === ""
      ) {
        swal({
          text: "Por favor complete todos los campos",
          button: {
            text: "De acuerdo!",
          },

          
        });
        setDisabledButton(false);
      }else {
      
        post(url, Object.assign(data, fechaRegistro), setDataResponse);
        setCedulaPaciente(data.cedula);
      }

      } 
    }
  };

  return (
    <form
      className="flex flex-col w-9/12 mx-16 md:mx-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="nombre"
        id="nombre"
        defaultValue={dataUser?.nombre}
        placeholder="Nombre completo"
        ref={register}
      />
      {/* <input
=======
        placeholder="Nombre"
        ref={register}
      />
      <input
>>>>>>> se valida al momento de crear una cita
=======
        placeholder="Nombre completo"
        ref={register}
      />
      {/* <input
>>>>>>> nuevas validaciones
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="apellidos"
        id="apellidos"
        defaultValue={dataUser?.apellidos}
        placeholder="Apellidos"
        ref={register}
<<<<<<< HEAD
<<<<<<< HEAD
      /> */}

      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="cedula"
        id="cedula"
        placeholder="Cedula"
        defaultValue={cedulaPaciente}
        ref={register}
      />
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="fecha_nacimiento"
        id="fecha_nacimiento"
        defaultValue={dataUser?.fecha_nacimiento}
        placeholder="Año/Mes/Día"
        ref={register}
      />
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="celular"
        id="celular"
        defaultValue={dataUser?.celular}
        placeholder="Celular"
        ref={register}
      />
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="direccion"
        id="direccion"
        defaultValue={dataUser?.direccion}
        placeholder="Dirección"
        ref={register}
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Ciudad</InputLabel>
        <Controller
          as={
            <Select
              native
              name="ciudad"
              id="ciudad"
              ref={register}
              value={dataUser?.ciudad}
              label="Ciudad"
              inputProps={{
                ciudad: "ciudad",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value={1}>Armenia</option>
              <option value={2}>Tebaida</option>
            </Select>
          }
          name="ciudad"
          control={control}
          defaultValue={1}
        />
      </FormControl>
      <input
        className="border-2 border-gray-400 rounded-md m-3 text-xl"
        name="ocupacion"
        id="ocupacion"
        defaultValue={dataUser?.ocupacion}
        placeholder="Ocupación"
        ref={register}
      />

      <input
        disabled={disabledButton}
        className={disabledButton ? "bg-gray-500 py-1 px-5 rounded-md text-white font-semibold" : "bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"}

        // disabled={disabledButton}
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"

        className={disabledButton ? "bg-gray-500 py-1 px-5 rounded-md text-white font-semibold" : "bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"}

        type="submit"
      />
    </form>
  );
}
