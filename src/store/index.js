import { createStore } from 'vuex';
import authentication from './authentication';

export default createStore({
  modules: {
    authentication,
  },
});
