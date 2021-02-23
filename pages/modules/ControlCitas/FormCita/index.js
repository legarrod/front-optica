import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import BlockIcon from "@material-ui/icons/Block";

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
}));

export default function index() {
  const classes = useStyles();
  return (
    <div className="border-2 rounded-lg border-gray-300 p-2 mx-2 md:m-5">
      <p className="text-2xl text-center mb-3">Cuadro clínico</p>
      <form
        className={`${classes.root} flex flex-wrap justify-center md:justify-between mx-10`}
        noValidate
        autoComplete="off"
      >
        <div className="mx-1 my-1">
          <TextField
            id="anamnesis-basic"
            label="Anamnesis"
            variant="outlined"
          />
        </div>
        <div className="mx-1 my-1">
          <TextField
            id="biomicrodcopia-basic"
            label="Biomicrodcopia"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="od_rx_uso-basic"
            label="OD rx en uso"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="oi_rx_uso-basic"
            label="OI rx en uso"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField id="oi_ap-basic" label="OI ap" variant="outlined" />
        </div>

        <div className="mx-1 my-1">
          <TextField id="oi_af-basic" label="OI af" variant="outlined" />
        </div>

        <div className="mx-1 my-1">
          <TextField id="od_ap-basic" label="OD ap" variant="outlined" />
        </div>

        <div className="mx-1 my-1">
          <TextField id="od_af-basic" label="OD af" variant="outlined" />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="od_avvlsc-basic"
            label="OD avvlsc"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="od_avvpsc-basic"
            label="OD avvpsc"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="od_avccvt-basic"
            label="OD avccvt"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="od_avccvp-basic"
            label="OD avccvp"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="od_refraccion-basic"
            label="OD refracción"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="od_rx_final-basic"
            label="OD rx final"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="oi_avvlsc-basic"
            label="OI avvlsc"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="oi_avvpsc-basic"
            label="OI avvpsc"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="oi_avccvt-basic"
            label="OI avccvt"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="oi_avccvp-basic"
            label="OI avccvp"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="oi_refraccion-basic"
            label="OI refracción"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="oi_rx_final-basic"
            label="OI rx final"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1">
          <TextField
            id="valor_cita-basic"
            label="Valor cita"
            variant="outlined"
          />
        </div>

        <div className="mx-1 my-1 w-full">
          <TextareaAutosize
            id="observaciones-basic"
            className="w-full border-2 rounded-md border-gray-300 p-1"
            aria-label="minimum height"
            rowsMin={3}
            placeholder="Observaciones"
            label="Observaciones"
            variant="outlined"
          />
        </div>

        <div className="flex flex-wrap flex-col md:flex-row w-full justify-center md:justify-end">
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
