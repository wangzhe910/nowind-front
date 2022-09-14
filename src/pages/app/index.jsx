import { connect } from 'dva';
import { Form, Button, Modal, Popconfirm, Radio } from 'antd';
import { useEffect, useState } from 'react';

const FormItem = Form.Item;
const namespace = 'pageapp';

const PageApp = (props) => {
  const {
    dispatch,
    loading,
    [namespace]: { list },
  } = props;
  return (
    <div>
      <div style={{ padding: '10px 20px 20px' }}>
        {/* <Radio.Group
          options={plainOptions}
          onChange={handleChangeRadio}
          value={value}
          optionType="button"
          buttonStyle="solid"
        /> */}
      </div>
    </div>
  );
};

export default connect(({ pageapp, loading }) => ({
  pageapp,
  loading: loading.effects[`${namespace}/getList`],
}))(PageApp);
