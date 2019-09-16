import axios from "axios";

console.log(process.env.REACT_APP_BACKEND_API_ENDPOINT);

// setting default api options
export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_ENDPOINT
});
