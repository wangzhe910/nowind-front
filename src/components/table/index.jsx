import { Space, Table, Tag } from 'antd';
const DataTable = (props) => {
  const { columns, tableData, pagination = false, size = 'middle' } = props;
  return (
    <Table
      style={{ tableLayout: 'fixed', minWidth: 800 }}
      columns={columns}
      dataSource={tableData}
      pagination={pagination}
      size={size}
    />
  );
};

export default DataTable;
