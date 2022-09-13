import { get, put, post, axiosDelete } from '@/utils/axios';

// 获取所有权限配置
export const fetchConfig = (params) => get('/app/config/list', params);

// 新增配置
export const addConfig = (params) => post('/app/config', params);

// 修改配置
export const updateConfig = (params) => put('/app/config', params);

// 删除配置
export const delConfig = (params) => axiosDelete(`/app/config/${params}`);

// 增加调用次数
export const addIncrease = (params) =>
  put(`/app/config/balance/increase?${params}`);
