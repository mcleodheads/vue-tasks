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

async function getDataById(name, id) {
  return axios.get(`/api/${name}/getById/${id}`, { withCredentials: true });
}

const tableAPIs = {
  getConfigurationCategoriesAPI,
  getSearchResults,
  getDataById,
};

export default tableAPIs;
