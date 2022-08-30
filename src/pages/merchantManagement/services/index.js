import { get, getWithNoToken, post, postWithNoToken } from '@/utils/axios';

// 获取所有商户
export const fetchList = (params) => getWithNoToken('/merchant/list', params);
