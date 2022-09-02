import { connect } from 'dva';
import { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import DataTable from '@/components/table/index';

const namespace = 'merchantManagement';

const MerchantManagement = (props: any) => {
  const {
    dispatch,
    merchantManagement: { list },
  } = props;

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
        return text ? '启用' : '禁用';
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
            <span className="global_span">编辑</span>
            <span className="global_span">删除</span>
          </>
        );
      },
    },
  ];

  const tableData: any = [
    {
      createUser: null,
      createTime: '2022-08-26 13:34:04',
      updateUser: null,
      updateTime: '2022-08-26 13:34:04',
      version: 0,
      merchantNo: 'M1661492044',
      merchantName: 'Upeo',
      contactName: '王哲',
      contactPhone: '13190876543',
      contactEmail: 'nio@scoreonetech.com',
      status: true,
    },
    {
      createUser: null,
      createTime: '2022-08-27 10:21:29',
      updateUser: null,
      updateTime: '2022-08-27 10:21:29',
      version: 0,
      merchantNo: 'M1661566888',
      merchantName: 'Domino',
      contactName: 'Domino',
      contactPhone: '13112345678',
      contactEmail: 'domino@163.com',
      status: true,
    },
    {
      createUser: null,
      createTime: '2022-08-28 09:36:18',
      updateUser: null,
      updateTime: '2022-08-28 09:36:18',
      version: 0,
      merchantNo: 'M1661650577',
      merchantName: 'Hank',
      contactName: '黄乐乐',
      contactPhone: '13012345678',
      contactEmail: 'hank@scoreonetech.com',
      status: true,
    },
  ];
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);
  tableData.push(tableData[0]);

  const getList = (params = {}) => {
    dispatch({
      type: `${namespace}/getList`,
      payload: params,
    });
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <div style={{ padding: '10px 20px 20px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginRight: 10 }}
        >
          新增
        </Button>
        <Button type="primary" icon={<SearchOutlined />}>
          查询
        </Button>
      </div>
      <DataTable
        columns={columns}
        tableData={tableData}
        fetchTable={(page, size) => {
          console.log('page: ', page, 'size: ', size);
        }}
      />
    </div>
  );
};

export default connect(({ merchantManagement, loading }: any) => ({
  merchantManagement,
  loadingGlobal: loading.global,
}))(MerchantManagement);
