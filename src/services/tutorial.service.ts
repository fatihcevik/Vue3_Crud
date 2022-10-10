import axios, { Axios } from 'axios';
import authHeader from './auth-header';

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

class UserService {

  getPublicContent(): Promise<any> {
    return apiClient.get(`tutorials`, { headers: authHeader() });
  }

  getAll(): Promise<any> {
    return apiClient.get(`tutorials`, { headers: authHeader() });
  }

  get(id: any): Promise<any> {
    return apiClient.get(`tutorials/${id}`, { headers: authHeader() });
  }

  create(data: any): Promise<any> {
    return apiClient.post(`tutorials`, data, { headers: authHeader() });
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`tutorials/${id}`, data, { headers: authHeader() });
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`tutorials/${id}`,{ headers: authHeader() });
  }

  deleteAll(): Promise<any> {
    return apiClient.delete(`tutorials`, { headers: authHeader() });
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`tutorials?title=${title}`, { headers: authHeader() });
  }
}



export default new UserService();