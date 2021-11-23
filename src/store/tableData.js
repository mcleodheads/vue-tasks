import tableAPIs from '../API/tableAPI';

const tableData = {
  namespaced: true,
  state: {
    isLoading: false,
    error: '',
    configCategories: [],
    searchingResults: [],
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
  },

  mutations: {
    getCategoriesRequest(state) {
      state.isLoading = true;
    },
    categoriesFetchingSuccess(state, data) {
      state.isLoading = false;
      state.configCategories = data.data.dictionaries;
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
  },
  getters: {},
};

export default tableData;
