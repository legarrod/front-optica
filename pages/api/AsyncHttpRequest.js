import axios from "axios";

export const getData = async (url, setData) => {
  try {
    const { data } = await axios.get(url);
    if (data) {
      setData(data[0]);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const post = async (url, formData = null, setDataResponse = null) => {
  try {
    const data = await axios.post(url, formData, setDataResponse);
    if (data.data === "Paciente agregado correctamente") {
      setDataResponse(data.data);
    }
  } catch (error) {
    console.log(error);
  }
  //return axios.post(url, formData, config);
};

export const put = async (url, params = null, setDataResponse = null) => {
  try {
    const data = await axios.put(url, params, setDataResponse);

    if (data.data === "Cita actualizada correctamente" || data.data === "Paciente actualizado correctamente") {
      setDataResponse(data);
    }
  } catch (error) {
    console.log(error);
  }
  //return axios.put(url, params, config);
}

// export function remove(url, params = null) {
//   return axios.delete(url, params);
// }
