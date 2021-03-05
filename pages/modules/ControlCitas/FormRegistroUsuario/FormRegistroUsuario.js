import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { post } from "../../../api/AsyncHttpRequest";
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
}) {
  const classes = useStyles();
  const url = `${process.env.API_GUARDAR_PACIENTE}`;
  const { register, handleSubmit, control } = useForm();
  const [dataResponse, setDataResponse] = useState("");
  const [ciudad, setCiudad] = useState(1);
  const [state, setState] = React.useState({
    id: "",
    ciudad: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.value;
    setCiudad(name);
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const onSubmit = (data) => (
    post(url, data, setDataResponse),
    console.log(data),
    setCedulaPaciente(data.cedula)
  );

  useEffect(() => {
    if (dataResponse) {
      swal("Exelente", "Paciente creado", "success");
      if (!accion) {
        setOpen(false);
        setOpenRegCita(true);
      }
    }
  }, [dataResponse]);

  return (
    <form
      className="flex flex-wrap justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap justify-center">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="nombre"
          placeholder="Nombre"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="apellidos"
          placeholder="Apellidos"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="cedula"
          placeholder="Cedula"
          defaultValue={cedulaPaciente}
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="fechanacimiento"
          placeholder="Fecha de Nacimiento"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="celular"
          placeholder="Celular"
          ref={register}
        />
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl"
          name="direccion"
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
                ref={register}
                value={state.age}
                onChange={handleChange}
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
          placeholder="Ocupación"
          ref={register}
        />
      </div>
      <input
        className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
        type="submit"
      />
    </form>
  );
}