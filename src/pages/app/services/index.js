import { get, put, post, axiosDelete } from '@/utils/axios';

// 根据实体属性分页查询
export const fetchListByPage = (params) => get('/app/page', params);

// 根据主键查询
export const fetchListById = (params) => get(`/app/id/${params}`);

// 根据appid查询
export const fetchListByAppid = (params) => get(`/app/appid/${params}`);

// 新增
export const add = (params) => post('/app', params);

// 修改
export const update = (params) => put('/app', params);

// 删除
export const deleted = (params) => axiosDelete(`/app/${params}`);
