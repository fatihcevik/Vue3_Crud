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
    return apiClient.get(`users`, { headers: authHeader() });
  }

  getAll(): Promise<any> {
    return apiClient.get(`users`, { headers: authHeader() });
  }

  get(id: any): Promise<any> {
    return apiClient.get(`users/${id}`, { headers: authHeader() });
  }

  create(data: any): Promise<any> {
    return apiClient.post(`users`, data, { headers: authHeader() });
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`users/${id}`, data, { headers: authHeader() });
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`users/${id}`, { headers: authHeader() });
  }

  findByUserName(username: string): Promise<any> {
    return apiClient.get(`users/${username}`, { headers: authHeader() });
  }
}



export default new UserService();