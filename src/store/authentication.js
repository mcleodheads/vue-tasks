import userService from '../API/userAPI';
import router from '../router';

const authentication = {
  namespaced: true,
  state: {
    user: null,
    isAuth: !!localStorage.getItem('token'),
    isLoading: false,
  },
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username });
      userService.loginUser(username, password)
        .then(
          (user) => {
            commit('loginSuccess', user);
            router.push('/table');
          },
          (error) => {
            commit('loginFailure', error);
            dispatch('alert/error', error, { root: true });
          },
        );
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('logout');
    },
  },
  mutations: {
    loginRequest(state) {
      state.isLoading = true;
    },
    loginSuccess(state, user) {
      state.isAuth = true;
      state.isLoading = false;
      localStorage.setItem('token', user.data.accessToken);
    },
    loginFailure() {
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
  getters: {
    isAuth: (state) => state.isAuth,
  },
};

export default authentication;
