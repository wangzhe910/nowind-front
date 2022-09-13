import {
  fetchConfig,
  addConfig,
  updateConfig,
  delConfig,
  addIncrease,
} from '../services/index';

export default {
  namespace: 'appConfig',
  state: {
    list: [],
  },
  effects: {
    *getList({ payload, callback }, { call, put }) {
      const result = yield call(fetchConfig, payload);
      if (result.code === 200) {
        yield put({
          type: '_getList',
          payload: result.data,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      const result = yield call(addConfig, payload);
      return result;
    },
    *update({ payload, callback }, { call, put }) {
      const result = yield call(updateConfig, payload);
      return result;
    },
    *addIncrease({ payload, callback }, { call, put }) {
      const result = yield call(addIncrease, payload);
      return result;
    },
    *delConfig({ payload, callback }, { call, put }) {
      const result = yield call(delConfig, payload);
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
