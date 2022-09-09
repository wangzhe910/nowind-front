import { get, put, post, axiosDelete } from '@/utils/axios';

// 用户列表
export const fetchUser = (params) => get('/user/list', params);

// 新增用户
export const addUser = (params) => post('/user', params);

// 修改用户
export const editUser = (params) => put('/user', params);

// 删除用户
export const delUser = (params) => axiosDelete(`/user/${params}`);

// 修改用户密码
export const editUserPassword = (params) => put('/user/password', params);

// 更新状态
export const editUserState = (params) => put('/user/state', params);
