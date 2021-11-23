import axios from 'axios';

async function getConfigurationCategoriesAPI() {
  return axios.get('/api/appConfiguration', { withCredentials: true });
}

async function getSearchResults(name) {
  const data = {
    filter: {},
    sort: {},
  };
  return axios.post(`/api/${name}/search`, data, { withCredentials: true });
}

const tableAPIs = {
  getConfigurationCategoriesAPI,
  getSearchResults,
};

export default tableAPIs;
