import axios from 'axios';

async function fetchLocalization(language) {
  return axios.get(`/api/translation/GetForLangType/${language}`);
}

const localizationAPIs = {
  fetchLocalization,
};

export default localizationAPIs;
