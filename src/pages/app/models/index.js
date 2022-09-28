import {
  fetchListByPage,
  fetchListById,
  fetchListByAppid,
  add,
  update,
  deleted,
} from '../services/index';

export default {
  namespace: 'pageapp',
  state: {
    list: [],
  },
  effects: {
    *getListByPage({ payload, callback }, { call, put }) {
      const result = yield call(fetchListByPage, payload);
      if (result.code === 200) {
        yield put({
          type: '_getList',
          payload: result.data.records,
        });
      }
    },
    *getListByAppid({ payload, callback }, { call, put }) {
      const result = yield call(fetchListByAppid, payload);
      if (result.code === 200) {
        yield put({
          type: '_getList',
          payload: typeof result.data !== 'string' ? [result.data] : [],
        });
      }
    },
    *getListById({ payload, callback }, { call, put }) {
      const result = yield call(fetchListById, payload);
      if (result.code === 200) {
        yield put({
          type: '_getList',
          payload: typeof result.data !== 'string' ? [result.data] : [],
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      const result = yield call(add, payload);
      return result;
    },
    *update({ payload, callback }, { call, put }) {
      const result = yield call(update, payload);
      return result;
    },
    *deleted({ payload, callback }, { call, put }) {
      const result = yield call(deleted, payload);
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
