import { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, notification, message } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { useIntl, history } from 'umi';
import { connect } from 'dva';
import { TOKEN, USER } from '@/utils/constant';
import styles from './index.less';

const FormItem = Form.Item;
const nameSpace = 'loginStore';
const Login = (props: any) => {
  const lang = useIntl();
  const {
    loginStore: { captchaSrc, captchaToken },
    loadingCaptcha,
    loadingLogin,
    dispatch,
  } = props;
  const [form] = Form.useForm();

  const handleGetCaptcha = (params = {}) => {
    dispatch({
      type: `${nameSpace}/getCaptcha`,
      payload: params,
    });
  };

  const handleReFresh = () => {
    handleGetCaptcha();
  };

  const handleLogin = async (values: any) => {
    const res = await dispatch({
      type: `${nameSpace}/login`,
      payload: {
        ...values,
        captchaToken,
      },
    });
    if (res.code === 200) {
      message.success('login success');
      localStorage.setItem(TOKEN, res.data.accessToken);
      localStorage.setItem(USER, JSON.stringify(res.data.user));
      history.push('/');
    } else {
      notification.error({
        message: res.msg,
      });
    }
  };

  useEffect(() => {
    handleReFresh();
    form.resetFields();
  }, []);

  return (
    <div className={styles['login']}>
      <div className={styles['login-main']}>
        <h1 style={{ textAlign: 'center' }}>智能风控系统</h1>
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={handleLogin}
        >
          <FormItem
            // label='UserName'
            className={styles['formitem']}
            name="loginName"
            rules={[
              {
                required: true,
                message: 'Please enter your username!',
              },
            ]}
          >
            <Input
              className={styles['login-ipt']}
              prefix={<UserOutlined />}
              placeholder="Please enter your username"
              style={{ height: 50 }}
            />
          </FormItem>
          <FormItem
            // label='PassWord'
            className={styles['formitem']}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input.Password
              className={styles['login-ipt']}
              prefix={<LockOutlined />}
              placeholder="Please enter your password"
              autoComplete="off"
              style={{ height: 50 }}
              // minLength={8}
            />
          </FormItem>
          <FormItem
            // label='Captcha'
            className={styles['formitem']}
            name="captcha"
            rules={[
              {
                required: true,
                message: 'Please enter the Captcha!',
              },
            ]}
          >
            <Input
              className={styles['login-ipt-captcha']}
              prefix={<ScheduleOutlined />}
              placeholder="Please enter the Captcha"
              style={{ height: 50 }}
            />
          </FormItem>
          <div className={styles['login-captcha']}>
            {loadingCaptcha ? (
              <span className={styles['login-captcha-img']}>
                <Spin />
              </span>
            ) : (
              <img
                onClick={handleReFresh}
                src={captchaSrc}
                className={styles['login-captcha-img']}
              />
            )}
          </div>
          <div className={styles['login-tip']}>Click image to refresh</div>
          <Button
            type="primary"
            htmlType="submit"
            className={styles['login-btn']}
            disabled={loadingLogin}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default connect(({ loginStore, loading }: any) => ({
  loginStore,
  loadingGlobal: loading.global,
  loadingCaptcha: loading.effects[`${nameSpace}/getCaptcha`],
  loadingLogin: loading.effects[`${nameSpace}/login`],
}))(Login);
