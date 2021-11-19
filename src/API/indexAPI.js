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

function logout() {
  localStorage.removeItem('token');
}

const userService = {
  loginUser,
  logout,
};

export default userService;
