import axios from "axios";

const API_URL = 'http://localhost:8000/api/firebase-users';

export const getFirebaseUsers = async () => {
    const res = await axios.get(`${API_URL}/`);
    return res.data;
};

export const getFirebaseUser = async (id) => {
    const res = await axios.get(`${API_URL}/show/${id}`);
    return res.data;
};

export const searchFirebaseUser = async (displayName) => {
    const res = await axios.get(`${API_URL}/search/${displayName}`);
    return res.data;
};

export const deleteFirebaseUser = async (id) => {
    const res = await axios.delete(`${API_URL}/delete/${id}`)
}