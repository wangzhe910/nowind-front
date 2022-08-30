import { connect } from 'dva';
import { useEffect } from 'react';
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
      key: 'action',
      render: (_: String, record: Object) => {
        return <a>编辑</a>;
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

  const getList = (params = {}) => {
    dispatch({
      type: `${namespace}/getList`,
      payload: params,
    });
  };

  useEffect(() => {
    getList();
    console.log('props: ', props);
  }, []);
  return (
    <div>
      <DataTable columns={columns} tableData={tableData} />
    </div>
  );
};

export default connect(({ merchantManagement, loading }: any) => ({
  merchantManagement,
  loadingGlobal: loading.global,
}))(MerchantManagement);
