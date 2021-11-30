import userService from '../API/userAPI';
// eslint-disable-next-line import/no-cycle
import router from '../main';

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
      router.push('/:locale/home');
    },
    loginFailure() {
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      router.push('/:locale/home');
    },
  },
  getters: {
    isAuth: (state) => state.isAuth,
  },
};

export default authentication;
