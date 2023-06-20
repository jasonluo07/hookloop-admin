import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';

import type { FilterFormProps } from '@/types';
import type { TFilterData } from './types';
import { DateRangePresets } from '@/utils/constants';
const { RangePicker } = DatePicker;

function FilterForm(props: FilterFormProps<TFilterData>) {
  const { filterFormInstance, onSearch } = props;

  const handleFilter = (values: TFilterData) => {
    onSearch(values, true);
  };

  const handleReset = () => {
    filterFormInstance.resetFields();
  };

  return (
    <Form
      name="filterUser"
      form={filterFormInstance}
      layout="inline"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleFilter}
      className="mb-4 rounded bg-white pt-2 shadow-sm"
    >
      <Row wrap gutter={[0, 12]} className="w-full px-4 py-3">
        <Col span={6}>
          <Form.Item name="Play" label="Plan Type">
            <Select
              options={[
                { value: 0, label: 'Plan A' },
                { value: 1, label: 'Plan B' },
              ]}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="username" label="email">
            <Input allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="isArchived" label="isArchived">
            <Select
              options={[
                { value: 0, label: 'Normal' },
                { value: 1, label: 'Archived' },
              ]}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item name="CreateDateRange" label="Register Date" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Start Date', 'End Date']}
              allowEmpty={[true, true]}
              allowClear
              presets={DateRangePresets}
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>
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
