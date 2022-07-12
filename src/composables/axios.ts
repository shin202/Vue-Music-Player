import axios from "axios";
const API_PATH = import.meta.env.VITE_API_PATH;

const instance = axios.create({
    baseURL: `${API_PATH}`
});

instance.interceptors.response.use(res => res.data);

export default instance;