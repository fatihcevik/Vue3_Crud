import axios from "axios";

const apiClient= axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;