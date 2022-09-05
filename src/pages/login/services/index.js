import {
  get,
  getWithNoToken,
  axiosDelete,
  postWithNoToken,
} from '@/utils/axios';

// 获取验证码
export const fetchCaptcha = (params) => getWithNoToken('/auth/captcha', params);
// 登录
export const postLogin = (parmas) => postWithNoToken('/auth/login', parmas);
// 注销
export const postLoginOut = (parmas) => axiosDelete('/auth/logout', parmas);
