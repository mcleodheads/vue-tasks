import { createStore } from 'vuex';
import authentication from './authentication';
import tableData from './tableData';
import localization from './localization';

export default createStore({
  modules: {
    authentication,
    localization,
    tableData,
  },
});
