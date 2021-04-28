import axios from "axios";

export const getData = async (url, setData) => {
  try {
    const { data } = await axios.get(url);
    if (data.status_code === 200) {
      setData(data.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const post = async (url, formData = null, setDataResponse = null) => {
  try {
    const data = await axios.post(url, formData, setDataResponse);
  
      setDataResponse(data);

  } catch (error) {
    console.log(error);
  }
  //return axios.post(url, formData, config);
};

export const put = async (url, params = null, setDataResponse = null) => {
  try {
    const data = await axios.put(url, params, setDataResponse);
      setDataResponse(data);
   
  } catch (error) {
    console.log(error);
  }
  //return axios.put(url, params, config);
}

// export function remove(url, params = null) {
//   return axios.delete(url, params);
// }
