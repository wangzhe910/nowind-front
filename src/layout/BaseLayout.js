import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, notification, Popover, Avatar, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import { history, useIntl } from 'umi';
import { connect } from 'dva';
import { MenuItems } from '@/utils/menuItems';
import Crumb from '@/components/crumb/index';
import { TOKEN, USER } from '@/utils/constant';
import styles from './index.less';
const { Header, Sider, Content } = Layout;

const BaseLayout = (props) => {
  const {
    children,
    location: { pathname },
    dispatch,
  } = props;
  const lang = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  const userInfo = localStorage.getItem(USER)
    ? JSON.parse(localStorage.getItem(USER))
    : null;

  const handleRoute = ({ item, key, keyPath, domEvent }) => {
    const { path } = item.props;
    history.push(path);
  };

  const handleLogout = async () => {
    const res = await dispatch({
      type: 'loginStore/loginout',
      payload: {},
    });
    if (res.code === 200) {
      localStorage.removeItem(USER);
      localStorage.removeItem(TOKEN);
      history.push('/login');
    }
  };

  const LogoutContent = () => {
    return (
      <Popconfirm title="确定退出系统吗？" onConfirm={handleLogout}>
        <span className="global_span">退出</span>
      </Popconfirm>
    );
  };

  useEffect(() => {
    // console.log('eee: ', props);
    // 没登录强定向到登录页
    if (!localStorage.getItem(TOKEN)) {
      history.push('/login');
      notification.open({
        message: lang.formatMessage({ id: 'baseLayout.loginTitle' }),
        description: lang.formatMessage({ id: 'baseLayout.loginText' }),
      });
    }
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
          <div className={styles['trigger']}>
            <span onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </span>
            {userInfo ? (
              <span className={styles['user']}>
                <Popover content={<LogoutContent />} placement="bottom">
                  <Avatar src={userInfo.avatarUrl} />
                </Popover>
                {userInfo.realName}
              </span>
            ) : null}
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

export default connect(({ loginStore }) => ({ loginStore }))(BaseLayout);
