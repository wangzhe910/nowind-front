// 左侧菜单栏配置
import { ShopOutlined, AppstoreAddOutlined } from '@ant-design/icons';

export const MenuItems = [
  {
    key: 'api',
    icon: <AppstoreAddOutlined />,
    label: 'Api管理',
    children: [
      { key: '1-1', label: 'Api密钥查询', path: '' },
      { key: '1-2', label: 'Api密钥管理', path: '' },
      { key: '1-3', label: 'Api权限配置', path: '' },
    ],
  },
  {
    key: 'mch',
    icon: <ShopOutlined />,
    label: '商户管理',
    children: [{ key: '/mch', label: '商户列表', path: '/mch' }],
  },
];
