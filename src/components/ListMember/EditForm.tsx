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
        name="editMember"
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
        <Form.Item name="isArchived" label="狀態">
          <Select
            placeholder="請選擇狀態"
            options={[
              { value: 0, label: 'Normal' },
              { value: 1, label: 'Archived' },
            ]}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditForm;
