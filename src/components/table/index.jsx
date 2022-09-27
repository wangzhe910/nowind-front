import { Table } from 'antd';
import { useState } from 'react';
import styles from './index.less';

/**
 * --- 必传 ---
 * @param {columns} 表格列配置
 * @param {tableData} 表格数据
 *
 * --- 选传 ---
 * @param {fetchTable} 分页变化的时候，请求数据的处理函数
 * @param {showPagination} 是否显示分页器，默认为 true
 * @param {loading} 请求的loading
 * @param {size} 表格尺寸，默认为 middle
 */

const DataTable = (props) => {
  const {
    columns,
    tableData,
    size = 'middle',
    fetchTable,
    showPagination = true,
    loading = false,
  } = props;
  const [pageSize, setPageSize] = useState(10);

  const pageConfig = showPagination
    ? {
        showTotal: (total) => `共有 ${total} 项数据`,
        position: ['bottomLeft'],
        showSizeChanger: true,
        pageSize,
        pageSizeOptions: [10, 20, 30, 50],
        onChange: (page, size) => {
          setPageSize(size);
          fetchTable && fetchTable(page, size);
        },
      }
    : false;

  return (
    <Table
      className={styles['table']}
      columns={columns}
      dataSource={tableData}
      pagination={pageConfig}
      size={size}
      // scroll={{
      //   y: 240,
      // }}
      loading={loading}
    />
  );
};

export default DataTable;
