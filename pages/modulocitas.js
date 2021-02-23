import React, { useState, useEffect } from "react";
import CardCitas from "./components/CardCitas/CardCitas";
import Button from "@material-ui/core/Button";
import { getData } from "./api/AsyncHttpRequest";
import MenuNav from "./components/MenuNav/MenuNav";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import swal from "sweetalert";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import FormRegistroUsuario from "./modules/ControlCitas/FormRegistroUsuario/FormRegistroUsuario";
import FormRegCita from "./modules/ControlCitas/FormRegCita/FormRegCita";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function ModuloCitas() {
  const url = `${process.env.API_OBTENER_TODAS_LAS_CITAS_RESUMIDAS}`;
  const urlAllInformation = `${process.env.API_OBTENER_TODAS_LAS_CITAS}`;
  const urlCitas = `${process.env.API_OBTENER_TODOS_LOS_PACIENTES}`;
  const [open, setOpen] = useState(false);
  const [openRegCita, setOpenRegCita] = useState(false);
  const [cedulaPaciente, setCedulaPaciente] = useState();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const classes = useStyles();

  const getDataEvent = () => {
    getData(url, setData);
  };
  const getAllData = ()=>{
    getData(urlAllInformation, setAllData);
  }

  useEffect(() => {
    getDataEvent();
    getAllData();
  }, []);

  const consultarCliente = () => {
    swal({
      text: "Consultar cliente",
      content: "input",
      button: {
        text: "Buscar!",
        closeModal: false,
      },
    })
      .then((name) => {
        setCedulaPaciente(name);
        if (!name) throw null;

        return fetch(`${urlCitas}/${name}`);
      })
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        const paciente = json;

        if (!paciente) {
          return swal("No paciente was found!");
        }
        if (paciente === "No existen paciente con esta cedula") {
          swal("Paciente no encontrado", "Vamos a crearlo", "error");
          setOpen(true);
        } else {
          const name = paciente.nombre;
          const apellidos = paciente.apellidos;
          const decula = paciente.cedula;
          swal({
            title: "El paciente ya existe",
            text: `${name} ${apellidos}`,
          });
          setOpenRegCita(true);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
console.log(data);
  return (
    <div>
      <MenuNav />
      <div className="mt-10">
        <div className="mx-10 flex flex-wrap justify-end">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className=""
            onClick={() => consultarCliente()}
            startIcon={<AddCircleOutlineIcon />}
          >
            Crear cita
          </Button>
        </div>
        <CardCitas data={data} allData={allData}/>
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={`${classes.paper} mx-2 md:mx-20 flex flex-wrap justify-center`}
          >
            <h2 className="text-3xl" id="titulo-registro">
              Registrar usuario
            </h2>
            <FormRegistroUsuario setOpen={setOpen} setOpenRegCita={setOpenRegCita} setCedulaPaciente={setCedulaPaciente} cedulaPaciente={cedulaPaciente}/>
          </div>
        </Fade>
      </Modal>

      <Modal
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
      </Modal>
    </div>
  );
}
