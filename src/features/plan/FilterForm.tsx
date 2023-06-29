import { Button, Col, Form, Row, Select, Space, FormInstance, Input } from 'antd';
import { PLAN_TYPE, STATUS_TYPE } from '@/features/constants';

interface IFilterFormProps {
  filterForm: FormInstance;
  onSearch: () => Promise<void>;
}

const FilterForm = ({ filterForm, onSearch }: IFilterFormProps) => {
  const handleReset = () => {
    filterForm.resetFields();
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
        <Col span={6}>
          <Form.Item name="planType" label="Plan Type">
            <Select options={PLAN_TYPE} allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status" label="Status">
            <Select options={STATUS_TYPE} allowClear />
          </Form.Item>
        </Col>
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
};

export default FilterForm;
