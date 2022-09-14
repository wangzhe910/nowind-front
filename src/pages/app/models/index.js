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
  effects: {},
  reducers: {},
};
