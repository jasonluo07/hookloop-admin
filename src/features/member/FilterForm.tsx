import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import type { FilterFormProps } from '@/types';
import { DateRangePresets } from '@/utils/constants';
import type { TFilterData } from './types';
import { IS_ARCHIVED_TYPE } from './constants';

const { RangePicker } = DatePicker;

function FilterForm(props: FilterFormProps<TFilterData>) {
  const { filterFormInstance, onSearch } = props;

  const handleReset = () => {
    filterFormInstance.resetFields();
  };

  return (
    <Form
      name="filterMember"
      form={filterFormInstance}
      layout="vertical"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={() => {
        handleReset();
        onSearch();
      }}
      className="mb-4 rounded bg-white pt-2 shadow-sm"
    >
      <Row wrap gutter={[0, 12]} className="w-full px-4 py-3">
        {/* <Col span={6}>
          <Form.Item name="planType" label="Plan Type">
            <Select options={PLAN_TYPE} allowClear />
          </Form.Item>
        </Col> */}
        <Col span={5}>
          <Form.Item name="email" label="Email">
            <Input allowClear />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="isArchived" label="Archived">
            <Select options={IS_ARCHIVED_TYPE} allowClear />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item name="registerDateRange" label="Register Date" labelCol={{ span: 10 }} wrapperCol={{ span: 30 }}>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Start Date', 'End Date']}
              allowEmpty={[false, false]}
              presets={DateRangePresets}
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* <Row wrap gutter={[0, 12]} className="w-full px-4 py-3">
        <Col span={9}>
          <Form.Item name="registerDateRange" label="Register Date" labelCol={{ span: 10 }} wrapperCol={{ span: 30 }}>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Start Date', 'End Date']}
              allowEmpty={[false, false]}
              presets={DateRangePresets}
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row> */}
      <Space className="w-full bg-gray-100 px-4 py-3">
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
