import { connect } from 'dva';
import {
  Form,
  Button,
  Modal,
  Row,
  Radio,
  Col,
  Input,
  Tag,
  Select,
  message,
  Popconfirm,
} from 'antd';
import { useEffect, useState } from 'react';
import DataTable from '@/components/table/index';

const FormItem = Form.Item;
const namespace = 'pageapp';
const Option = Select.Option;
const options = [
  {
    label: '分页',
    value: '1',
  },
  {
    label: 'appid',
    value: '2',
  },
  {
    label: '主键',
    value: '3',
  },
];

const PageApp = (props) => {
  const {
    dispatch,
    loading,
    [namespace]: { list },
  } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [type, setType] = useState('1');
  const [show, setShow] = useState(false);
  const [modalValue, setModalValue] = useState({});
  const [urlStr, setUrlStr] = useState('http://');
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const merchantOptions = props.merchantManagement.list || [];

  const selectBefore = (
    <Select value={urlStr} onChange={(v) => setUrlStr(v)}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id'
    // },
    {
      title: '应用ID',
      dataIndex: 'appId',
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
    },
    {
      title: 'appSecret',
      dataIndex: 'appSecret',
    },
    {
      title: '商户',
      dataIndex: 'merchantNo',
      render: (text) => {
        const arr = merchantOptions.filter((item) => item.merchantNo === text);
        return arr[0]?.merchantName;
      },
    },
    {
      title: '回调地址',
      dataIndex: 'callBackUrl',
      width: 120,
      render: (text) => {
        return <div style={{ width: 120, overflowX: 'auto' }}>{text}</div>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      render: (text) => {
        return text ? (
          <Tag color="#87d068">已启用</Tag>
        ) : (
          <Tag color="#f50">已禁用</Tag>
        );
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 170,
    },
    {
      title: '操作',
      width: 130,
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
              <span className="global_span" style={{ color: 'red' }}>
                删除
              </span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    const res = await dispatch({
      type: `${namespace}/deleted`,
      payload: id,
    });
    if (res.code === 200) {
      message.success('success');
      getList();
    } else {
      message.error(res.msg);
    }
  };

  const getList = async (args = type, page = current, size = pageSize) => {
    const url =
      args === '1'
        ? 'getListByPage'
        : args === '2'
        ? 'getListByAppid'
        : 'getListById';
    const values = await form.validateFields();
    let params = {};
    if (args === '1') {
      if (values.merchantNo) {
        params.merchantNo = values.merchantNo;
      }
      params.current = page;
      params.size = size;
    } else if (args === '2') {
      params = values.appId;
    } else if (args === '3') {
      params = values.id;
    }
    dispatch({
      type: `${namespace}/${url}`,
      payload: params,
    });
  };

  const handleSearch = () => {
    getList();
  };

  const getMerchantList = (params = {}) => {
    dispatch({
      type: 'merchantManagement/getList',
      payload: params,
    });
  };

  const handleSave = async () => {
    const data = await formModal.validateFields();
    const params = {
      ...data,
      callBackUrl: urlStr + data.callBackUrl,
    };
    if (modalValue.id) params.id = modalValue.id;
    if (modalValue.appId) params.appId = modalValue.appId;
    const res = await dispatch({
      type: `${namespace}/${modalValue.id ? 'update' : 'add'}`,
      payload: params,
    });
    if (res.code === 200) {
      message.success('success');
      getList();
      setShow(false);
    }
    console.log('res: ', res);
  };

  useEffect(() => {
    getList();
    getMerchantList();
  }, []);

  useEffect(() => {
    if (!Object.keys(modalValue).length) {
      formModal.resetFields();
    } else {
      formModal.setFieldsValue(modalValue);
    }
  }, [modalValue]);

  return (
    <div>
      <div style={{ padding: '10px 20px 20px' }}>
        <Form labelCol={{ span: 8 }} form={form}>
          <Row>
            <Col span={8}>
              <FormItem label="查询方式">
                <Radio.Group
                  options={options}
                  onChange={(e) => {
                    setType(e.target.value);
                    form.resetFields();
                  }}
                  value={type}
                  optionType="button"
                  buttonStyle="solid"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label={type === '1' ? '商户' : type === '2' ? 'appId' : 'id'}
                name={
                  type === '1' ? 'merchantNo' : type === '2' ? 'appId' : 'id'
                }
                rules={type === '1' ? [] : [{ required: true }]}
              >
                {type === '1' ? (
                  <Select>
                    {merchantOptions.map((item) => (
                      <Select.Option value={item.merchantNo}>
                        {item.merchantName}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Input allowClear />
                )}
              </FormItem>
            </Col>
            <Col span={4} offset={4}>
              <Button type="primary" onClick={handleSearch}>
                查询
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setType('1');
                  form.resetFields();
                  getList('1');
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
          <Button type="primary" onClick={() => setShow(true)}>
            新增
          </Button>
        </Form>
        <DataTable
          columns={columns}
          tableData={list}
          fetchTable={(page, size) => {
            console.log('page: ', page, 'size: ', size);
            setCurrent(page);
            setPageSize(pageSize);
            getList('1', page, size);
          }}
          showPagination={type === '1'}
          loading={loading}
        />
      </div>
      <Modal
        title="新增"
        visible={show}
        onCancel={() => {
          setShow(false);
        }}
        onOk={handleSave}
        destroyOnClose
        centered
      >
        <Form labelCol={{ span: 6 }} form={formModal}>
          {/* <FormItem label="应用ID" name="appId" rules={[{ required: true }]}>
            <Input />
          </FormItem> */}
          <FormItem
            label="应用名称"
            name="appName"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
          {/* <FormItem
            label="appSecret"
            name="appSecret"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem> */}
          <FormItem label="商户" name="merchantNo" rules={[{ required: true }]}>
            <Select>
              {merchantOptions.map((item) => (
                <Select.Option value={item.merchantNo}>
                  {item.merchantName}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="回调地址"
            name="callBackUrl"
            rules={[{ required: true }]}
          >
            <Input addonBefore={selectBefore} />
          </FormItem>
          <FormItem label="是否启用" name="status" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem
            label="描述"
            name="description"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(({ pageapp, loading, merchantManagement }) => ({
  pageapp,
  loading: loading.effects[`${namespace}/getList`],
  merchantManagement,
}))(PageApp);
