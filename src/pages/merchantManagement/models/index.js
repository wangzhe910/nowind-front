import {
  fetchList,
  addMerchant,
  updateMerchant,
  delMerchant,
} from '../services/index';

export default {
  namespace: 'merchantManagement',
  state: {
    list: [],
  },
  effects: {
    *getList({ payload, callback }, { call, put }) {
      const result = yield call(fetchList, payload);
      if (result.code === 200) {
        yield put({
          type: '_getList',
          payload: result.data,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      const result = yield call(addMerchant, payload);
      return result;
    },
    *update({ payload, callback }, { call, put }) {
      const result = yield call(updateMerchant, payload);
      return result;
    },
    *deleted({ payload, callback }, { call, put }) {
      const result = yield call(delMerchant, payload);
      return result;
    },
  },
  reducers: {
    _getList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};
