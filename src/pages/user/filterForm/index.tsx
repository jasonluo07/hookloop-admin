import dayjs from 'dayjs';
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import type { FilterFormProps } from '@/types';
import { PLAN_TYPE, Status_TYPE } from '@/features/member/constants';
import { TFilterData } from '@/features/member/types';
import { useParams } from 'react-router-dom';

function FilterForm(props: FilterFormProps<TFilterData>) {
  const { filterForm, onSearch } = props;
  const param = useParams();

  const handleReset = () => {
    if (param.id && param.name) {
      filterForm.setFieldsValue({
        userId: param.id,
        username: param.name,
        planType: undefined,
        payTime: undefined,
        status: undefined,
        merchantOrderNo: undefined,
      });
    } else {
      filterForm.resetFields();
    }
  };

  return (
    <Form
      name="filterMember"
      form={filterForm}
      layout="vertical"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onSearch}
      className="mb-4 rounded bg-white pt-2 shadow-sm"
    >
      <Row wrap gutter={[0, 12]} className="w-full px-4 py-1">
        <Form.Item name="userId" label="" hidden>
          <Input disabled />
        </Form.Item>
        <Col span={6}>
          <Form.Item name="username" label="Username">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="planType" label="Plan Type">
            <Select options={PLAN_TYPE} allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status" label="Status">
            <Select options={Status_TYPE} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row wrap className="w-full px-4 py-1">
        <Col span={12}>
          <Form.Item name="merchantOrderNo" label="MerchantOrderNo">
            <Input />
          </Form.Item>
        </Col>
        {/* <Col span={10}>
          <Form.Item name="payTime" label="Pay Time" labelCol={{ span: 10 }} wrapperCol={{ span: 30 }}>
            <DatePicker
              className="w-full"
            />
          </Form.Item>
        </Col> */}
      </Row>
      <Space className="w-full bg-white px-4 py-1">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={handleReset}>
            Reset
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}

export default FilterForm;
