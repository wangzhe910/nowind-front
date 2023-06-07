import { connect } from 'dva';
import { useEffect, useState } from 'react';
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
  Select,
  Row,
  Col,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import DataTable from '@/components/table/index';

const FormItem = Form.Item;
const namespace = 'appConfig';
const AppConfig = (props) => {
  const {
    [namespace]: { list },
    dispatch,
    loading,
  } = props;
  const [show, setShow] = useState(false);
  const [modalValue, setModalValue] = useState({});
  const [apiurl, setApiurl] = useState();
  const [merchant, setMerchant] = useState();
  const [form] = Form.useForm();
  const [formQuery] = Form.useForm();

  const columns = [
    {
      title: '商户',
      dataIndex: 'merchantNo',
      render: (text) => {
        const arr = merchantOptions.filter((item) => item.merchantNo === text);
        return arr[0]?.merchantName;
      },
    },
    {
      title: '调用余量',
      dataIndex: 'balance',
      width: 80,
    },
    {
      title: '接口地址',
      dataIndex: 'apiUrl',
    },
    {
      title: '是否收费',
      dataIndex: 'chargingRequired',
      width: 80,
      render: (text) => {
        return text ? '是' : '否';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 170,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 170,
    },
    {
      title: '操作',
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
            <Popconfirm
              title="确定删除该项吗?"
              onConfirm={() => handleDelete(record.id)}
            >
              <span className="global_span">删除</span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const getList = (params = {}) => {
    dispatch({
      type: `${namespace}/getList`,
      payload: params,
    });
  };

  const getMerchantList = (params = {}) => {
    dispatch({
      type: 'merchantManagement/getList',
      payload: params,
    });
  };

  const handleDelete = async (id) => {
    const res = await dispatch({
      type: `${namespace}/delConfig`,
      payload: id,
    });
    if (res.code === 200) {
      message.success('success');
      getList();
    } else {
      message.error(res.msg);
    }
  };

  const handleSearch = async () => {
    const params = await formQuery.validateFields();
    getList(params);
  };

  const handleReset = () => {
    formQuery.resetFields();
    getList();
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const type = Object.keys(modalValue).length;
    const params = {
      ...values,
    };
    if (type) {
      params.id = modalValue.id;
    }
    const res = await dispatch({
      type: `${namespace}/${type ? 'update' : 'add'}`,
      payload: params,
    });
    if (res.code === 200) {
      const increaseRes = await dispatch({
        type: `${namespace}/addIncrease`,
        payload: `increase=${params.balance}&merchantNo=${params.merchantNo}&uri=${params.apiUrl}`,
      });
      if (increaseRes.code === 200) {
        message.success('success');
        // getList();
        handleSearch();
        setShow(false);
      } else {
        message.error(res.msg);
      }
    } else {
      message.error(res.msg);
    }
    console.log('res: ', res);
  };

  useEffect(() => {
    getList();
    getMerchantList();
  }, []);

  useEffect(() => {
    if (!Object.keys(modalValue).length) {
      form.resetFields();
    } else {
      form.setFieldsValue(modalValue);
    }
  }, [modalValue]);

  const merchantOptions = props.merchantManagement.list || [];
  const isEdit = Object.keys(modalValue).length;

  return (
    <div>
      <div>
        <Form form={formQuery} labelCol={{ span: 6 }}>
          <Row>
            <Col span={8}>
              <FormItem label="商户" name="merchantNo">
                <Select placeholder="请选择" style={{ width: 200 }}>
                  {merchantOptions.map((item) => (
                    <Select.Option value={item.merchantNo}>
                      {item.merchantName}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={16}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                查询
              </Button>
              <Button
                style={{ marginLeft: 10, marginBottom: 10 }}
                onClick={handleReset}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            // style={{ marginLeft: 10 }}
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
        title={isEdit ? '修改配置' : '新增配置'}
        visible={show}
        onCancel={() => {
          setModalValue({});
          setShow(false);
        }}
        onOk={handleSave}
        destroyOnClose
        centered
        afterClose={() => {
          form.resetFields();
        }}
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
            label="apiUrl"
            name="apiUrl"
            rules={[
              {
                required: true,
                message: `请输入apiUrl`,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="商户"
            name="merchantNo"
            rules={[
              {
                required: true,
                message: `请选择`,
              },
            ]}
          >
            <Select>
              {merchantOptions.map((item) => (
                <Select.Option value={item.merchantNo}>
                  {item.merchantName}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="是否收费"
            name="chargingRequired"
            valuePropName="checked"
          >
            <Switch />
          </FormItem>
          <FormItem
            label="增加调用次数"
            name="balance"
            rules={[
              {
                required: true,
                message: `请输入调用次数`,
              },
            ]}
          >
            <Input type="number" max={1000000} />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(({ appConfig, merchantManagement, loading }) => ({
  appConfig,
  merchantManagement,
  loading: loading.effects[`${namespace}/getList`],
}))(AppConfig);
