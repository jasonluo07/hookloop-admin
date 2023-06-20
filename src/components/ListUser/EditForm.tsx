import { Form, Input, message, Modal, Select, Typography } from 'antd';

import type { EditFormProps } from '@/types';
import type { TFilterData, TEditData, TRecord } from './types';

const { Title } = Typography;

function EditForm(props: EditFormProps<TFilterData, TRecord>) {
  const { isEditFormOpen, setIsEditFormOpen, filterFormInstance, onSearch, record } = props;
  const [form] = Form.useForm();
  const initialEditData = {
    username: record.username,
    email: record.email,
    isArchived: record.isArchived,
  };

  const handleEdit = async (values: TEditData) => {
    console.log('values', values);
    // TODO: axios
    message.error('尚未完成');
  };

  return (
    <Modal
      title={<Title level={4}>Edit</Title>}
      open={isEditFormOpen}
      okText="Submit"
      onOk={form.submit}
      cancelText="Cancel"
      onCancel={() => setIsEditFormOpen(false)}
      className="w-[600px]"
    >
      <Form
        name="editUser"
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={initialEditData}
        onFinish={handleEdit}
      >
        <Form.Item name="username" label="Username">
          <Input disabled />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="isArchived" label="IsArchived">
          <Select
            placeholder="Please select isArchived"
            options={[
              { value: true, label: 'true' },
              { value: false, label: 'false' },
            ]}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditForm;
