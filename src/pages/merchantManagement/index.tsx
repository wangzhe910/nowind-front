import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Tag, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import DataTable from '@/components/table/index';

const namespace = 'merchantManagement';
const FormItem = Form.Item;

const MerchantManagement = (props: any) => {
  const {
    dispatch,
    merchantManagement: { list },
    loadingList,
  } = props;
  const [show, setShow] = useState(false);
  const [modalValue, setModalValue] = useState({});
  const [form] = Form.useForm();

  const columns = [
    {
      title: '商户名称',
      dataIndex: 'merchantName',
      key: 'merchantName',
      width: 150,
    },
    {
      title: '商户号',
      dataIndex: 'merchantNo',
      key: 'merchantNo',
    },
    {
      title: '商户联系人',
      dataIndex: 'contactName',
      key: 'contactName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: Boolean, record: Object) => {
        return text ? (
          <Tag color="#87d068">启用</Tag>
        ) : (
          <Tag color="#f50">禁用</Tag>
        );
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: '',
      width: 200,
      key: 'action',
      render: (_: String, record: Object) => {
        return (
          <>
            <span
              className="global_span"
              onClick={() => {
                console.log('recc: ', record);
                setModalValue(record);
                setShow(true);
              }}
            >
              编辑
            </span>
            <Popconfirm
              title="确定删除该商户吗？"
              onConfirm={() => handleDelete(record.merchantNo)}
            >
              <span className="global_span">删除</span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const formConfig = [
    // { label: '商户号', name: 'merchantNo', required: true },
    { label: '商户名称', name: 'merchantName', required: true },
    { label: '商户联系人', name: 'contactName', required: true },
    { label: '联系方式', name: 'contactPhone', required: true },
    { label: '邮箱', name: 'contactEmail', required: true },
  ];

  const getList = (params = {}) => {
    dispatch({
      type: `${namespace}/getList`,
      payload: params,
    });
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const res = await dispatch({
      type: `${namespace}/${Object.keys(modalValue).length ? 'update' : 'add'}`,
      payload: values,
    });
    if (res.code === 200) {
      message.success('success');
      getList();
      setShow(false);
    } else {
      message.error(res.msg);
    }
  };

  const handleDelete = async (merchantNo: any) => {
    const res = await dispatch({
      type: `${namespace}/deleted`,
      payload: merchantNo,
    });
    if (res.code === 200) {
      message.success('success');
      getList();
    } else {
      message.error(res.msg);
    }
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginRight: 10 }}
          onClick={() => setShow(true)}
        >
          新增
        </Button>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => getList()}
        >
          查询
        </Button>
      </div>
      <DataTable
        columns={columns}
        tableData={list}
        fetchTable={(page, size) => {
          console.log('page: ', page, 'size: ', size);
        }}
        loading={loadingList}
      />
      <Modal
        title="新增商户"
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
          {formConfig.map((item) => (
            <React.Fragment key={item.name}>
              <FormItem
                label={item.label}
                name={item.name}
                rules={
                  item.required
                    ? [
                        {
                          required: true,
                          message: `请输入${item.label}!`,
                        },
                      ]
                    : []
                }
              >
                <Input />
              </FormItem>
            </React.Fragment>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default connect(({ merchantManagement, loading }: any) => ({
  merchantManagement,
  loadingGlobal: loading.global,
  loadingList: loading.effects[`${namespace}/getList`],
}))(MerchantManagement);
