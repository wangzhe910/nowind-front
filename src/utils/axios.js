import Axios from 'axios';
import { notification } from 'antd';

const PLATFORM = process.env; //process.env.PLATFORM
console.log('PLATFORM: ', process.env);
// 请求超时时间
Axios.defaults.timeout = 15000;
Axios.defaults.baseURL =
  PLATFORM.NODE_ENV === 'development'
    ? 'http://120.77.252.213:8011/nowind-auth/'
    : '';

// post请求头的设置
Axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';

const axios = Axios.create();
const instanceAxios = Axios.create();

// axios.defaults.headers['Authorization'] = localStorage.getItem('sales_token')

// axios request拦截器
axios.interceptors.request.use(
  (config) => {
    // 可在此设置要发送的token
    let token = localStorage.getItem('sales_token');
    if (token) {
      token && (config.headers.Authorization = token);
      return config;
    } else {
      console.log('没有token');
      return Promise.error('no token');
    }
  },
  (error) => {
    return Promise.error(error);
  },
);

// axios response拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写response拦截器
    if (
      response.status === 200 &&
      (response.data.code === 1 || response.data.code === 0)
    ) {
      return Promise.resolve(response);
    } else {
      const msg = (response.data && response.data.msg) || '请求出错了';
      return Promise.reject(response);
    }
  },
  (error) => {
    const responseCode = error.response.status;
    switch (responseCode) {
      // 400：code和state过期
      case 400:
        console.log('400出错： ====', error.response.data);
        break;
      // 401：未登录
      case 401:
        console.log('401');
        break;
      // 404请求不存在
      case 404:
        console.log('404');
        break;
      default:
        console.error('请求走了默认code', error.response.data.message);
    }
    return Promise.reject(error.response);
  },
);

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * axiosDelete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function axiosDelete(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function postWithNoToken(url, params) {
  return new Promise((resolve, reject) => {
    // console.log('url', url);
    instanceAxios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data || '请求出错了');
      });
  });
}

export function getWithNoToken(url, params = {}) {
  return new Promise((resolve, reject) => {
    instanceAxios
      .get(url, { params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
