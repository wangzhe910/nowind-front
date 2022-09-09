import {
  fetchUser,
  addUser,
  editUser,
  delUser,
  editUserPassword,
  editUserState,
} from '../services/index';

export default {
  namespace: 'user',
  state: {
    list: [],
  },
  effects: {
    *getList({ payload, callback }, { call, put }) {
      const result = yield call(fetchUser, payload);
      if (result.code === 200) {
        yield put({
          type: '_getList',
          payload: result.data,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      const result = yield call(addUser, payload);
      return result;
    },
    *update({ payload, callback }, { call, put }) {
      const result = yield call(editUser, payload);
      return result;
    },
    *updateState({ payload, callback }, { call, put }) {
      const result = yield call(editUserState, payload);
      return result;
    },
    *updatePassword({ payload, callback }, { call, put }) {
      const result = yield call(editUserPassword, payload);
      return result;
    },
    *delUser({ payload, callback }, { call, put }) {
      const result = yield call(delUser, payload);
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
