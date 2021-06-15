import React, { useState, useEffect } from 'react';
import MenuNav from './components/MenuNav/MenuNav';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TablaClientesAbonos from '../pages/modules/Contabilidad/TablaClientesAbonos/TablaClientesAbonos';
import Link from 'next/link';
import axios from 'axios';
import CachedIcon from '@material-ui/icons/Cached';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ExportCSV from './modules/Contabilidad/ExportCSV';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { getLogin } from './api/user';
import ResumenHistoria from './modules/ControlCitas/ResumenHistoria/ResumenHistoria';

export default function Productos() {
  const urlObtenerFacturaPersona = `${process.env.API_OBTENER_FACTURA_PERSONA}`;
  const urlObtenerFacturas = `${process.env.API_OBTENER_FACTURAS}`;
  const [allInvoices, setAllInvoices] = useState([]);
  const [cedulaBuscar, setCedulaBuscar] = useState();
  const [buscando, setBuscando] = useState();
  const [verHistoria, setVerHistoria] = useState(false);

  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const { auth } = useAuth();

  const getInvoices = async (urlObtenerFacturas, setAllInvoices = null) => {
    try {
      const data = await axios.get(urlObtenerFacturas);
      if (data) {
        //setAllProducts(data.data);
        setAllInvoices(data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refresData = () => {
    setBuscando(false);
    getInvoices(urlObtenerFacturas, setAllInvoices);
  };

  const handlerBuscarFactura = (e) => {
    getInvoices(`${urlObtenerFacturaPersona}${e.target.value}`, setAllInvoices);
    setBuscando(true);
    setCedulaBuscar(e.target.value);
  };

  useEffect(() => {
    const response = getLogin();
    setUser(response);
    buscando &&
      getInvoices(`${urlObtenerFacturaPersona}${cedulaBuscar}`, setAllInvoices);
    !buscando && getInvoices(urlObtenerFacturas, setAllInvoices);
  }, [cedulaBuscar, buscando]);

  const fileName = 'Optica Quindiana';

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace('./login');
  }

  const handlerVerHistoria = () => {
    setVerHistoria(true);
  };

  return (
    <div>
      {user && (
        <div className="m-0">
          <MenuNav />
          <div className="mt-15">
            <div className="px-3 sm:px-10 md:px-20 fact">
              <div className="m-0 mb-5 mt-5 flex flex-wrap justify-start ml-8 barra">
                <Link href="/generarfactura">
                  <a>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className="none-print rounded-sm"
                      style={{ marginTop: 4 }}
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      Generar factura
                    </Button>
                  </a>
                </Link>
                <input
                  style={{ marginTop: 4 }}
                  className="none-print border-2 border-gray-400 h-10 mt-0 mb-0 rounded-md m-3 text-xl"
                  name="nombre"
                  placeholder="Buscar factura"
                  onChange={(e) => handlerBuscarFactura(e)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="none-print rounded-sm"
                  style={{ marginTop: 4 }}
                  onClick={() => refresData()}
                  startIcon={<CachedIcon />}
                >
                  Refrescar
                </Button>
                <div className="none-print mx-2">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className="rounded-sm"
                    style={{ marginTop: 4 }}
                    onClick={() => handlerVerHistoria()}
                  >
                    Ver historia
                  </Button>
                </div>

                <ExportCSV fileName={fileName} />
              </div>
              <TablaClientesAbonos
                allInvoices={allInvoices}
                setAllInvoices={setAllInvoices}
                getAllInvoices={getInvoices}
              />
            </div>
          </div>
        </div>
      )}

      {verHistoria && <ResumenHistoria setVerHistoria={setVerHistoria} />}
    </div>
  );
}
