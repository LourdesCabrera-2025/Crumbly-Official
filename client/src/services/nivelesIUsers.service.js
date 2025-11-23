import axios from "axios";

// Base URL de tu API
const API_URL = "http://localhost:8000/api/tipo-usuarios"; 
// Obtener todos los tipos de usuario
export const getAllTipos = async () => {
  try {
    const response = await axios.get(API_URL);
    // Asegurarnos de que siempre sea un arreglo
    const data = Array.isArray(response.data) ? response.data : [];
    return { data };
  } catch (error) {
    console.error("Error obteniendo tipos de usuario:", error);
    return { data: [] };
  }
};

// Crear un nuevo tipo de usuario
export const createTipoUsuario = async (tipo) => {
  try {
    const response = await axios.post(API_URL, tipo);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error creando tipo de usuario:", error);
    return { data: null, error };
  }
};

// Actualizar un tipo de usuario
export const updateTipoUsuario = async (id, tipo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, tipo);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error actualizando tipo de usuario:", error);
    return { data: null, error };
  }
};

// Eliminar un tipo de usuario
export const deleteTipoUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error eliminando tipo de usuario:", error);
    return { data: null, error };
  }
};
