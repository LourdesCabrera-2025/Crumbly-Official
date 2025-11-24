import axios from "axios";


const API_URL = "http://localhost:8000/api/tipo-usuarios"; 

export const getAllTipos = async () => {
  try {
    const response = await axios.get(API_URL);

    const data = Array.isArray(response.data) ? response.data : [];
    return { data };
  } catch (error) {
    console.error("Error obteniendo tipos de usuario:", error);
    return { data: [] };
  }
};


export const createTipoUsuario = async (tipo) => {
  try {
    const response = await axios.post(API_URL, tipo);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Lo sentimos, intentelo nuevamente no se logro crear el nivel de usuario:", error);
    return { data: null, error };
  }
};


export const updateTipoUsuario = async (id, tipo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, tipo);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("No se pudo actualizar el nivel de usuario:", error);
    return { data: null, error };
  }
};


export const deleteTipoUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Losentimos hubo un error al tratar de eliminar el nivel de usuario: ", error);
    return { data: null, error };
  }
};
