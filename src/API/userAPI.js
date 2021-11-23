import axios from 'axios';

axios.interceptors.request.use((configuration) => {
  configuration.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; // eslint-disable-line no-param-reassign
  return configuration;
});

async function loginUser(login, password) {
  return axios.post('/api/identity/login', {
    login,
    password,
    language: 'en',
  }, { withCredentials: true });
}

const userService = {
  loginUser,
};

export default userService;
