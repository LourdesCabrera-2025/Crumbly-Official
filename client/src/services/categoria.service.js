import axios from "axios";

const API_URL = "http://localhost:8000/api/categoria";

export const getAllCategorias = async () => {
    try {

        const response = await axios.get(API_URL);
        const data = Array.isArray(response.data) ? response.data : [];
        return {data};
    }catch (error) {
        console.error("Error obteniendo las categorias de los productos", error)
        return {data: []};
    }
};

export const createCategory = async(categoria) => {
    try {
        const response = await axios.post(API_URL, categoria);
        return {data: response.data, error: null};
    } catch (error) {
        console.error("Lo sentimos , intentelo nuevamente: Error al crear la nueva categoria");
        return {data: null, error};
    }
};

export const updateCategoria = async (id_categoria, categoria) => {
    try {
        const response = await axios.put(`${API_URL}/${id_categoria}`, categoria);
        return {data : response.data, error: null};
    } catch (error) {
        console.error("No se pudo actualizar la categoría del producto");
        return {data: null, error};
    }
};

export const deleteCategoria = async (id_categoria) => {
    try {
        const response = await axios.delete(`${API_URL}/${id_categoria}`);
        return {data: response.data,error: null};
    } catch (error) {
        console.error("Lo sentimos hubo un error al tratar de eliminar la categoria", error);
        return {data: null , error};
    }
};