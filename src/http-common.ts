import axios from "axios";

const apiClient= axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDI5MGVhZDVhNjlkNmZhMjA4OWM3YiIsImlhdCI6MTY2NTMwNzY2MSwiZXhwIjoxNjY1Mzk0MDYxfQ.SRt-WhhrRZcRBpqVak-gI_f7JrCU6wTpKWIvw-WYxjQ",
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDI5MGVhZDVhNjlkNmZhMjA4OWM3YiIsImlhdCI6MTY2NTMwNzY2MSwiZXhwIjoxNjY1Mzk0MDYxfQ.SRt-WhhrRZcRBpqVak-gI_f7JrCU6wTpKWIvw-WYxjQ" 
  },
});

export default apiClient;