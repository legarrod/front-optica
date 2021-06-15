import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { useSpring, animated } from 'react-spring/web.cjs';
import FormCrearEntrada from '../FormCrearProducto/FormCrearEntrada';
import ExportCSV from './ExportCSV';

import FormCrearproducto from '../FormCrearProducto';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
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

export default function CustomizedTableProducto() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openEntrada, setOpenEntrada] = useState(false);
  const [data, setData] = useState();
  const urlGetProducts = `${process.env.API_BASE_OPTICA}productos/api/productos-details`;
  const urlUpdateProducts = `${process.env.API_ACTUALIZAR_TODOS_LOS_PRODUCTOS}`;
  const urlDeleteProdcto = `${process.env.API_ELIMINAR_PRODUCTO}`;
  const [allProducts, setAllProducts] = useState([]);
  const [obtenerDataImg, setObtenerDataImg] = useState(null);
  const [codigoProducto, setCodigoProducto] = useState();
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState(null);
  const [linkFoto, setLinkFoto] = useState();
  const [viewUpdateInfo, setViewUpdateInfo] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenEntrada(false);
  };

  const consultarProducto = () => {
    setOpen(true);
  };
  const crearEntrada = () => {
    setOpenEntrada(true);
  };

  const getProduct = async (urlGetProducts, setAllProducts = null) => {
    try {
      const data = await axios.get(urlGetProducts, setAllProducts);
      if (data.data.status_code === 200) {
        setAllProducts(data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (url) => {
    try {
      const data = await axios.delete(url);
      if (data.data === 'eliminado correctamente') {
        getProduct(urlGetProducts, setAllProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarProducto = (value) => {
    setViewUpdateInfo(true);
    setData(value);
    setCodigoProducto(value.idproducto);
    setLinkFoto(value.imagen);
    setObtenerDataImg(null);
  };
  const eliminarProducto = (value) => {
    remove(`${urlDeleteProdcto}id=${value.codigo}`);
  };

  const putProducto = async (url, params) => {
    try {
      const data = await axios.put(url, params);
      if (data) {
        getProduct(urlGetProducts, setAllProducts);
        setViewUpdateInfo(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refresData = () => {
    getProduct(urlGetProducts, setAllProducts);
  };
  const onSubmit = (data) => {
    console.log(data);

    putProducto(urlUpdateProducts, data);
  };

  useEffect(() => {
    getProduct(urlGetProducts, setAllProducts);
    refresData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full mb-10">
      <div className="w-full px-8">
        <div className="m-0 mb-5 flex flex-wrap justify-end">
          <div className="m-2">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="rounded-sm"
              onClick={() => consultarProducto()}
              startIcon={<AddCircleOutlineIcon />}
            >
              Crear productos
            </Button>
          </div>
          <div className="m-2">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="rounded-sm"
              onClick={() => crearEntrada()}
              startIcon={<AddCircleOutlineIcon />}
            >
              Crear Entrada
            </Button>
            <ExportCSV />
          </div>
        </div>
        <div className="overflow-y-auto w-full mx-3 ">
          <TableContainer className="h-96" component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="left">Codigo</StyledTableCell>
                  <StyledTableCell align="left">Nombre</StyledTableCell>
                  <StyledTableCell align="left">Descripcio</StyledTableCell>
                  <StyledTableCell align="center">Cantidad</StyledTableCell>
                  {/* <StyledTableCell align="center">Foto</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {allProducts.length > 0 &&
                  allProducts?.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">
                        <div className="flex flex-row">
                          <button>
                            <EditIcon onClick={() => actualizarProducto(row)} />
                          </button>
                          <button>
                            <DeleteForeverIcon
                              onClick={() => eliminarProducto(row)}
                            />
                          </button>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.codigo}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.nombre}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.descripcion}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.cantidad}
                      </StyledTableCell>
                      {/* <StyledTableCell align="left"><img className="h-14 w-auto rounded-full" src={row.imagen} onClick={()=>handlerViewImage(row)}/></StyledTableCell> */}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {obtenerDataImg !== null && (
        <div className="mx-5 flex flex-col w-full md:w-2/5 mt-10 md:mt-0">
          <p className="text-center text-blue-800 text-2xl font-semibold">
            {obtenerDataImg.name}
          </p>
          <img
            className="h-80 w-auto border border-gray-700 shadow-lg"
            src={obtenerDataImg.img}
            alt="Optica"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {viewUpdateInfo && (
        <div className="mx-5 flex flex-col w-full md:w-2/5 mt-10 md:mt-0">
          <p className="text-2xl w-full ">Actualizar producto</p>
          <form
            className="flex flex-col w-9/12 mx-16 md:mx-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="border-2 border-gray-400 rounded-md m-3 text-xl select-none"
              name="codigo"
              defaultValue={data?.codigo}
              placeholder={data?.codigo}
              ref={register}
            />
            <input
              className="border-2 border-gray-400 rounded-md m-3 text-xl"
              name="nombre"
              defaultValue={data?.nombre}
              placeholder={data?.nombre}
              ref={register}
            />
            <input
              className="border-2 border-gray-400 rounded-md m-3 text-xl"
              name="descripcion"
              defaultValue={data?.descripcion}
              placeholder={data?.descripcion}
              ref={register}
            />
            <input
              className="bg-blue-700 py-1 px-5 rounded-md text-white font-semibold"
              type="submit"
            />
          </form>
        </div>
      )}

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
            className={`${classes.paper} mx-2 md:mx-20 flex flex-col justify-center`}
          >
            <h2 className="text-3xl" id="titulo-registro">
              Registrar Producto
            </h2>
            <div className="">
              <FormCrearproducto setOpen={setOpen} refresData={refresData} />
            </div>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openEntrada}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEntrada}>
          <div
            className={`${classes.paper} mx-2 md:mx-20 flex flex-col justify-center`}
          >
            <h2 className="text-3xl" id="titulo-registro">
              Crear entrada
            </h2>
            <div className="">
              <FormCrearEntrada
                setOpen={setOpenEntrada}
                refresData={refresData}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
