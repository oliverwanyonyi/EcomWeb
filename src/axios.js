import axios from "axios";

const instance = axios.create({
  baseURL: "https://shopyetuapi.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
// const instance = axios.create({ baseURL: "http://localhost:4000/api" });
// export const axiosPrivate = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: true,
// });

export const axiosPrivate = axios.create({
  baseURL: "https://shopyetuapi.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default instance;
