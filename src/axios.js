import axios from "axios";

const instance = axios.create({ baseURL: "https://shopyetuapi.onrender.com/api"});

export default instance;
