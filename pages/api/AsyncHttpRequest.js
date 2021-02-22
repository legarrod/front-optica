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

// export function put(url, params = null, config = null) {
//   return axios.put(url, params, config);
// }

// export function remove(url, params = null) {
//   return axios.delete(url, params);
// }
