import { connect } from 'dva';
import { Form, Button, Modal, Row, Radio, Col, Input } from 'antd';
import { useEffect, useState } from 'react';

const FormItem = Form.Item;
const namespace = 'pageapp';

const PageApp = (props) => {
  const {
    dispatch,
    loading,
    [namespace]: { list },
  } = props;
  const [type, setType] = useState('1');
  const [form] = Form.useForm();
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
  return (
    <div>
      <div style={{ padding: '10px 20px 20px' }}>
        <Form labelCol={{ span: 8 }}>
          <Row>
            <Col span={8}>
              <FormItem label="查询方式">
                <Radio.Group
                  options={options}
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  optionType="button"
                  buttonStyle="solid"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label={type === '1' ? '商户号' : type === '2' ? 'appId' : 'id'}
                name={
                  type === '1' ? 'merchantNo' : type === '2' ? 'appId' : 'id'
                }
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={4} offset={4}>
              <Button type="primary">查询</Button>
              <Button style={{ marginLeft: 10 }}>重置</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default connect(({ pageapp, loading }) => ({
  pageapp,
  loading: loading.effects[`${namespace}/getList`],
}))(PageApp);
