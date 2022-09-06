import { get, put, post, axiosDelete } from '@/utils/axios';

// 获取所有商户
export const fetchList = (params) => get('/merchant/list', params);

// 新增商户
export const addMerchant = (params) => post('/merchant', params);

// 编辑商户
export const updateMerchant = (params) => put('/merchant', params);

// 删除商户
export const delMerchant = (params) => axiosDelete(`/merchant/${params}`);
