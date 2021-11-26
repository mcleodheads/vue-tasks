import localizationAPI from '../API/localizationAPIs';

const localization = {
  namespaced: true,
  state: {
    localizationLib: {},
    isLoading: false,
    error: '',
    chosenLanguage: 'en',
  },
  actions: {
    getLocalization({ dispatch, commit }, language) {
      commit('getLocalizationRequest', language);
      localizationAPI.fetchLocalization(language)
        .then(
          (data) => {
            commit('localizationFetchSuccess', data);
          },
          (error) => {
            commit('localizationFetchingFail', error);
            dispatch('alert/error', error, { root: true });
          },
        );
    },
  },
  mutations: {
    getLocalizationRequest(state) {
      state.isLoading = true;
    },
    localizationFetchSuccess(state, { data }) {
      state.isLoading = false;
      state.localizationLib = data;
      console.log(data);
    },
    localizationFetchingFail(state, error) {
      state.isLoading = false;
      state.error = error;
    },
  },
};

export default localization;
