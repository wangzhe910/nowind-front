// 左侧菜单栏配置
import {
  ShopOutlined,
  AppstoreAddOutlined,
  UserSwitchOutlined,
  PartitionOutlined,
} from '@ant-design/icons';

export const MenuItems = [
  {
    key: 'user',
    icon: <UserSwitchOutlined />,
    label: '用户管理',
    children: [{ key: '/user', label: '用户列表', path: '/user' }],
  },
  {
    key: 'mch',
    icon: <ShopOutlined />,
    label: '商户管理',
    children: [
      { key: '/mch', label: '商户列表', path: '/mch' },
      { key: '/mchConfig', label: '商户权限配置', path: '/mchConfig' },
    ],
  },
  {
    key: 'app',
    icon: <AppstoreAddOutlined />,
    label: '应用管理',
    children: [{ key: '/app', label: '应用列表', path: '/app' }],
  },
  // {
  //   key: 'appConfig',
  //   icon: <PartitionOutlined />,
  //   label: '应用权限配置',
  //   children: [
  //     { key: '/appConfig', label: '应用权限列表', path: '/appConfig' },
  //   ],
  // },
];
