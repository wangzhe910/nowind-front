import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, notification } from 'antd';
import { useState, useEffect } from 'react';
import { history, useIntl } from 'umi';
import { MenuItems } from '@/utils/menuItems';
import Crumb from '@/components/crumb/index';
import styles from './index.less';
const { Header, Sider, Content } = Layout;

const BaseLayout = (props) => {
  const {
    children,
    location: { pathname },
  } = props;
  const lang = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  // useEffect(() => {
  //   // 登录了显示欢迎提示语
  //   // 没登录强定向到登录页
  //   history.push('/login');
  //   notification.open({
  //     message: lang.formatMessage({ id: 'baseLayout.loginTitle' }),
  //     description: lang.formatMessage({ id: 'baseLayout.loginText' }),
  //   });
  // }, []);

  const handleRoute = ({ item, key, keyPath, domEvent }) => {
    const { path } = item.props;
    history.push(path);
  };

  useEffect(() => {
    console.log('eee: ', props);
  }, []);

  return (
    <Layout className={styles['layout']}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles['logo']}>智能风控系统</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={[pathname.substring(1)]}
          defaultSelectedKeys={[pathname]}
          style={{ padding: 0, margin: 0 }}
          items={MenuItems}
          onClick={handleRoute}
        />
      </Sider>
      <Layout>
        <Header
          className={styles['site-layout-background']}
          style={{
            padding: 0,
          }}
        >
          <div
            className={styles['trigger']}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </div>
        </Header>
        <Content className={styles['content']}>
          <Crumb pathname={pathname} />
          <div className={styles['content-child']}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
