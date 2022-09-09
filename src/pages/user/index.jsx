import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Tag,
  Form,
  Input,
  message,
  Popconfirm,
  Avatar,
  Radio,
  Switch,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import DataTable from '@/components/table/index';

const namespace = 'user';
const FormItem = Form.Item;

const UserManagement = (props) => {
  const {
    dispatch,
    user: { list },
    loading,
  } = props;
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [account, setAccount] = useState();
  const [modalValue, setModalValue] = useState({});
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      render: (text) => {
        return <Avatar src={text} />;
      },
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (text) => {
        return text ? '女' : '男';
      },
    },
    {
      title: '账号',
      dataIndex: 'loginName',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
    {
      title: '是否管理员',
      dataIndex: 'admin',
      render: (text) => {
        return text ? '是' : '否';
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record) => {
        const confirmStr = text ? '禁用' : '启用';
        const tagStr = text ? '启用' : '禁用';
        return (
          <Popconfirm
            title={`确定要${confirmStr}该账号吗`}
            onConfirm={() => handleChangeState(!text, record.userId)}
          >
            <Tag
              style={{ cursor: 'pointer' }}
              color={text ? '#87d068' : '#f50'}
            >
              {tagStr}
            </Tag>
          </Popconfirm>
        );
      },
    },
    {
      title: '操作',
      dataIndex: '',
      width: 200,
      render: (_, record) => {
        return (
          <div>
            <span
              className="global_span"
              onClick={() => {
                setModalValue(record);
                setShow(true);
              }}
            >
              编辑
            </span>
            <span
              className="global_span"
              onClick={() => {
                setShowPassword(true);
                setModalValue(record);
              }}
              style={{ margin: '0 10px' }}
            >
              修改密码
            </span>
            <Popconfirm
              title="确定删除该项吗?"
              onConfirm={() => handleDelete(record.userId)}
            >
              <span className="global_span">删除</span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleChangeState = async (text, id) => {
    const res = await dispatch({
      type: `${namespace}/updateState`,
      payload: {
        state: text,
        userId: id,
      },
    });
    if (res.code === 200) {
      message.success('success');
      getList();
    } else {
      message.error(res.msg);
    }
  };

  const handleSearch = () => {
    const params = {
      loginName: account,
      realName: name,
    };
    !params.loginName && delete params.loginName;
    !params.realName && delete params.realName;
    getList(params);
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const type = Object.keys(modalValue).length;
    const params = {
      ...values,
      avatarUrl:
        'https://jeequan.oss-cn-beijing.aliyuncs.com/jeepay/img/defava_m.png',
      merchantNo: '0',
      sysType: 'MGR',
      userId: type ? modalValue.userId : new Date().getTime(),
    };
    const res = await dispatch({
      type: `${namespace}/${type ? 'update' : 'add'}`,
      payload: params,
    });
    if (res.code === 200) {
      message.success('success');
      getList();
      setShow(false);
    } else {
      message.error(res.msg);
    }
  };

  const handleSavePassword = async () => {
    if (password) {
      const res = await dispatch({
        type: `${namespace}/updatePassword`,
        payload: {
          userId: modalValue.userId,
          password,
        },
      });
      if (res.code === 200) {
        message.success('success');
        getList();
        setShowPassword(false);
      } else {
        message.error(res.msg);
      }
    }
  };

  const handleDelete = async (userId) => {
    const res = await dispatch({
      type: `${namespace}/delUser`,
      payload: userId,
    });
    if (res.code === 200) {
      message.success('success');
      getList();
    } else {
      message.error(res.msg);
    }
  };

  const getList = (params = {}) => {
    dispatch({
      type: `${namespace}/getList`,
      payload: params,
    });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (!Object.keys(modalValue).length) {
      form.resetFields();
    } else {
      form.setFieldsValue(modalValue);
    }
  }, [modalValue]);

  return (
    <div>
      <div style={{ padding: '10px 20px 20px' }}>
        <Input
          placeholder="账号"
          value={account}
          allowClear
          style={{ width: 200 }}
          onChange={(e) => setAccount(e.target.value)}
          disabled
        />
        <Input
          placeholder="姓名"
          allowClear
          style={{ width: 200, margin: '0 20px 10px' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          查询
        </Button>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginRight: 10 }}
            onClick={() => setShow(true)}
          >
            新增
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        tableData={list}
        fetchTable={(page, size) => {
          console.log('page: ', page, 'size: ', size);
        }}
        loading={loading}
      />
      <Modal
        title={Object.keys(modalValue).length ? '修改用户' : '新增用户'}
        visible={show}
        onCancel={() => {
          setModalValue({});
          setShow(false);
        }}
        onOk={handleSave}
        destroyOnClose
        centered
      >
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <FormItem
            label="姓名"
            name="realName"
            rules={[
              {
                required: true,
                message: `请输入姓名!`,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="性别"
            name="sex"
            rules={[
              {
                required: true,
                message: `请选择!`,
              },
            ]}
          >
            <Radio.Group>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem
            label="账号"
            name="loginName"
            rules={[
              {
                required: true,
                message: `请输入账号!`,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="联系方式"
            name="phone"
            rules={[
              {
                required: true,
                message: `请输入联系方式!`,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem label="是否管理员" name="admin" valuePropName="checked">
            <Switch />
          </FormItem>
          <FormItem
            label="状态"
            name="state"
            rules={[
              {
                required: true,
                message: `请选择!`,
              },
            ]}
          >
            <Radio.Group disabled={Object.keys(modalValue).length}>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>禁用</Radio>
            </Radio.Group>
          </FormItem>
        </Form>
      </Modal>
      <Modal
        title="修改密码"
        centered
        destroyOnClose
        visible={showPassword}
        onCancel={() => {
          setPassword();
          setModalValue({});
          setShowPassword(false);
        }}
        onOk={handleSavePassword}
      >
        <span>新密码：</span>
        <Input.Password
          allowClear
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default connect(({ user, loading }) => ({
  user,
  loading: loading.effects[`${namespace}/getList`],
}))(UserManagement);
