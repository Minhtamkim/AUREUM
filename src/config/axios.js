import axios from "axios";

const api = axios.create({
  baseURL: "http://14.225.211.152:8081/api",
});

export default api;
