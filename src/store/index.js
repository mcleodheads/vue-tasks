import { createStore } from 'vuex';
import authentication from './authentication';
import tableData from './tableData';

export default createStore({
  modules: {
    authentication,
    tableData,
  },
});
