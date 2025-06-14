import axios from 'axios';

const API_URL = 'http://localhost:5000'; // แก้ตาม backend จริง

export const register = async (data: any) => {
    return await axios.post(`${API_URL}/api/auth/register`, data);
};

export const login = async (data: any) => {
    return await axios.post(`${API_URL}/api/auth/login`, data);
};

export const me = async (data: any) => {
    return await axios.get(`${API_URL}/api/auth/me`, data);
};
