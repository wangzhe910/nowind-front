import { fetchCaptcha, postLogin, postLoginOut } from '../services/index';
export default {
  namespace: 'loginStore',
  state: {
    captchaSrc: '',
    captchaToken: '',
  },
  effects: {
    *getCaptcha({ payload, callback }, { call, put }) {
      const result = yield call(fetchCaptcha, payload);
      if (result.code === 200) {
        yield put({
          type: '_getCaptcha',
          payload: {
            cpimg: result.data.data.imageBase64,
            cpcode: result.data.data.captchaToken,
          },
        });
      }
    },
    *login({ payload, callback }, { call, put }) {
      const result = yield call(postLogin, payload);
      return result;
    },
    *loginout({ payload, callback }, { call, put }) {
      const result = yield call(postLoginOut, payload);
      console.log('out result: ', result);
      return result;
    },
  },
  reducers: {
    _getCaptcha(state, action) {
      return {
        ...state,
        captchaSrc: action.payload.cpimg,
        captchaToken: action.payload.cpcode,
      };
    },
  },
};
