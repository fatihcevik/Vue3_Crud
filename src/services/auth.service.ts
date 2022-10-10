import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(user:any) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        console.log("BOOM"+response.data);
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user:any) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();