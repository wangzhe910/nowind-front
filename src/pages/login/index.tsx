import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useIntl } from 'umi';
import styles from './index.less';

const Login = () => {
  const lang = useIntl();
  return (
    <div className={styles['login']}>
      <div className={styles['login-main']}>
        <Card title={lang.formatMessage({ id: 'form.loginTitle' })}></Card>
      </div>
    </div>
  );
};

export default Login;
