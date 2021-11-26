import tableAPIs from '../API/tableAPI';

const tableData = {
  namespaced: true,
  state: {
    isLoading: false,
    error: '',
    configCategories: [],
    searchingResults: [],
    modalData: {
      data: [],
      isLoading: false,
    },
  },
  actions: {
    getConfigCategories({ dispatch, commit }) {
      commit('getCategoriesRequest');
      tableAPIs.getConfigurationCategoriesAPI()
        .then(
          (data) => {
            commit('categoriesFetchingSuccess', data);
          },
          (error) => {
            commit('categoriesFetchingFail', error);
            dispatch('alert/error', error, { root: true });
          },
        );
    },

    getCategoriesValues({ dispatch, commit }, { name }) {
      commit('searchRequest', { name });
      tableAPIs.getSearchResults(name)
        .then(
          (data) => {
            commit('searchSuccess', data);
          },
          (error) => {
            commit('searchFailed', error);
            dispatch('alert/error', error, { root: true });
          },
        );
    },

    getDataById({ dispatch, commit }, { name, id }) {
      commit('getDataByIdRequest', { name, id });
      tableAPIs.getDataById(name, id)
        .then(
          (data) => {
            commit('fetchingSuccess', data);
          },
          (error) => {
            commit('fetchingFailed', error);
            dispatch('alert/error', error, { root: true });
          },
        );
    },
  },

  mutations: {
    getCategoriesRequest(state) {
      state.isLoading = true;
    },
    categoriesFetchingSuccess(state, data) {
      state.isLoading = false;
      state.configCategories = data.data;
    },
    categoriesFetchingFail(state, error) {
      state.error = error;
      state.isLoading = false;
    },

    searchRequest(state) {
      state.isLoading = true;
    },
    searchSuccess(state, data) {
      state.isLoading = false;
      state.searchingResults = data.data.items;
    },
    searchFailed(state, error) {
      state.error = error;
      state.isLoading = false;
    },

    getDataByIdRequest(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state, data) {
      state.isLoading = false;
      state.modalData.data = data.data;
    },
    fetchingFailed(state, error) {
      state.isLoading = false;
      state.error = error;
    },
  },
  getters: {},
};

export default tableData;
