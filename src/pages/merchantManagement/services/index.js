import { get, getWithNoToken, post, postWithNoToken } from '@/utils/axios';

// 获取所有商户
export const fetchList = (params) => get('/merchant/list', params);
