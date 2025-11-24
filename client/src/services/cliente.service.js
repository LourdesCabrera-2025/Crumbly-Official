import axios from "axios";

const API_URL = "http://localhost:8000/api/clientes";

export const getAllClientes = async () => {
    try {
        const response = await axios.get(API_URL);
        return { data: response.data, error: null };
    } catch (error) {
        console.error("Error obteniendo clientes:", error);
        return { data: [], error };
    }
};

export const getClienteById = async (id_cliente) => {
    try {
        const response = await axios.get(`${API_URL}/${id_cliente}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error("Error obteniendo cliente:", error);
        return { data: null, error };
    }
};


export const updateCliente = async (id_cliente, formData) => {
    try {
        const response = await axios.post(
            `${API_URL}/${id_cliente}/update`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return { data: response.data, error: null };
    } catch (error) {
        console.error("Error actualizando cliente:", error);
        return { data: null, error };
    }
};


export const deleteCliente = async (id_cliente) => {
    try {
        const response = await axios.delete(`${API_URL}/${id_cliente}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error("Error eliminando cliente:", error);
        return { data: null, error };
    }
};
