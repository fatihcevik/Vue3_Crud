import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem("user") || "{}");
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login(user:any) {
      return AuthService.login(user).then(    
        user => {
         return Promise.resolve(user);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    logout() {
      AuthService.logout();
    },
    register(user:any) {
      return AuthService.register(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state:any, user:any) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state:any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state:any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state:any) {
      state.status.loggedIn = false;
    },
    registerFailure(state:any) {
      state.status.loggedIn = false;
    }
  }
};