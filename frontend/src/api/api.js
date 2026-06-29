import axios from "axios";

const API = axios.create({
  baseURL: "https://cafeteria-backend-pqev.onrender.com/api/"
});

export default API;