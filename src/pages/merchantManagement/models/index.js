import { fetchList } from '../services/index';
export default {
  namespace: 'merchantManagement',
  state: {
    list: [],
  },
  effects: {
    *getList({ payload, callback }, { call, put }) {
      console.log('有咩有');
      const result = yield call(fetchList, payload);
      // console.log("resu: ",result)
      // const company = result.data[0];
      // const data = {
      //   topList: result.data,
      //   topListCompany: result.data[0],
      // };
      // yield put({
      //   type: '_getTopList',
      //   payload: data,
      // });
      // return data;
    },
  },
  reducers: {},
};
