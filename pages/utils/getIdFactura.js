import axios from "axios";
const getIdFactura = async (numFactura, setIdFactura, setFacturaOk)=>{
	const url = `${process.env.API_OBTENER_ID_FACTURA}${numFactura}`;
	
		try {
		  const { data } = await axios.get(url);
		  setIdFactura(data.data[0].id)
		  setFacturaOk(true);
		} catch (error) {
		  console.log(error.message);
		}
	 
	  
};
export default getIdFactura;