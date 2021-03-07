import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import BlockIcon from "@material-ui/icons/Block";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useForm, Controller } from "react-hook-form";
import getDate from '../../../utils/utils'
import {post, put} from '../../../api/AsyncHttpRequest'
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function index(allData) {
  let idCita = parseInt(allData?.allData?.id_cita_paciente);
  let informacionCita = allData?.allData;
  const url = `${process.env.API_ACTUALIZAR_CITA}/`;
  const [dataResponse, setDataResponse] = useState("");
  const classes = useStyles();
  let hoy = new Date();
  const { register, handleSubmit, control } = useForm();
  const [state, setState] = React.useState({
    id: "",
    ciudad: "hai",
  });
  const defaultInfo = {
    nombre_doctor: 1,
    fk_id_sede: 1,
    fecha_creacion: getDate(hoy),
    fecha_cita: getDate(hoy), 
    fk_id_paciente: parseInt(allData?.allData?.fk_id_paciente),
    id_cita_paciente: parseInt(allData?.allData?.id_cita_paciente)
  }

  const onSubmit = (data) => (
    put(url, Object.assign(data, defaultInfo), setDataResponse)
  )

  useEffect(() => {
    if (dataResponse) {
      swal("Exelente", "Cita Actualizada con exito!", "success");
    }
    
  }, [dataResponse])
 
console.log(informacionCita);
  return (
    <div className="border-2 rounded-lg border-gray-300 p-2 mx-2 md:m-5">
      <p className="text-2xl text-center mb-3">Cuadro clínico</p>
      <form
      className="flex flex-wrap justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="anamnesis"
          defaultValue={informacionCita?.anamnesis}
          placeholder="Anamnesis"
          ref={register}
        />          
        </div>
        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="biomicrodcopia"
          defaultValue={informacionCita?.biomicrodcopia}
          placeholder="Biomicrodcopia"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_rx_uso"
          defaultValue={informacionCita?.od_rx_uso}
          placeholder="OD rx en uso"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_rx_uso"
          defaultValue={informacionCita?.oi_rx_uso}
          placeholder="OI rx en uso"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_ap"
          defaultValue={informacionCita?.oi_ap}
          placeholder="OI ap"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_af"
          defaultValue={informacionCita?.oi_af}
          placeholder="OI af"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_ap"
          defaultValue={informacionCita?.od_ap}
          placeholder="OI ap"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_af"
          defaultValue={informacionCita?.od_af}
          placeholder="OI af"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_avvlsc"
          defaultValue={informacionCita?.od_avvlsc}
          placeholder="OD avvlsc"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_avvpsc"
          defaultValue={informacionCita?.od_avvpsc}
          placeholder="OD avvpsc"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_avccvt"
          defaultValue={informacionCita?.od_avccvt}
          placeholder="OD avccvt"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_avccvp"
          defaultValue={informacionCita?.od_avccvp}
          placeholder="OD avccvp"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_refraccion"
          defaultValue={informacionCita?.od_refraccion}
          placeholder="OD refracción"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="od_rx_final"
          defaultValue={informacionCita?.od_rx_final}
          placeholder="OD rx final"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_avvlsc"
          defaultValue={informacionCita?.oi_avvlsc}
          placeholder="OI avvlsc"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_avvpsc"
          defaultValue={informacionCita?.oi_avvpsc}
          placeholder="OI avvpsc"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_avccvt"
          defaultValue={informacionCita?.oi_avccvt}
          placeholder="OI avccvt"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_avccvp"
          defaultValue={informacionCita?.oi_avccvp}
          placeholder="OI avccvp"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_refraccion"
          defaultValue={informacionCita?.oi_refraccion}
          placeholder="OI refracción"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="oi_rx_final"
          defaultValue={informacionCita?.oi_rx_final}
          placeholder="OI rx final"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1">
        <input
        type="number"
          className="border-2 border-gray-400 rounded-md m-3 text-xl p-3"
          name="valor_cita"
          defaultValue={informacionCita?.valor_cita}
          placeholder="Valor cita"
          ref={register}
        />
        </div>

        <div className="mx-1 my-1 md:w-full">
          <input
            className="border-2 h-20 md:w-full border-gray-400 rounded-md m-3 text-xl p-3"
            name="observaciones"
            defaultValue={informacionCita?.observaciones}
            placeholder="Observaciones"
            ref={register}
          />
       
        </div>

        <div className="flex flex-wrap  md:flex-row w-full justify-center md:justify-end">
        <select className="border-2 p-2 bg-white border-gray-400 rounded-md text-xl" name="fk_id_estado" ref={register}>
          <option value={0}>Re-abrir</option>
          <option value={1}>Consultado</option>
          <option value={2}>Cancelar</option>
        </select>
          <div className="mx-5 my-2">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={`${classes.button}`}
              startIcon={<BlockIcon />}
            >
              Cancelar
            </Button>
          </div>

          <div className="mx-5 my-2">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={`${classes.button}`}
              startIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
