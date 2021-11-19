import userService from '../API/indexAPI';
import router from '../router';

const initialState = {
  user: {},
  isAuth: false,
};

const authentication = {
  namespaced: true,
  initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username });
      userService.loginUser(username, password)
        .then(
          (user) => {
            commit('loginSuccess', user);
            router.push('/about');
          },
          (error) => {
            commit('loginFailure', error);
            dispatch('alert/error', error, { root: true });
          },
        );
    },
    logout({ commit }) {
      userService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginRequest(state, user) {
      state.user = user;
    },
    loginSuccess(state, user) {
      state.isAuth = true;
      localStorage.setItem('token', user.data.accessToken);
      state.user = user;
    },
    loginFailure(state) {
      state.isAuth = false;
      state.user = null;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
};

export default authentication;
