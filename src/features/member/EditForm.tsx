import { Form, Input, Modal, Select, Typography } from 'antd';
import type { EditFormProps } from '@/types';
import type { TFilterData, TRecord } from './types';
import { IS_ARCHIVED_TYPE } from './constants';

const { Title } = Typography;

function EditForm(props: EditFormProps<TFilterData, TRecord>) {
  const { isEditFormOpen, setIsEditFormOpen, editForm, onUpdate, record } = props;
  const initialEditData = {
    username: record.username,
    email: record.email,
    isArchived: record.isArchived,
  };

  return (
    <Modal
      title={<Title level={4}>Edit</Title>}
      open={isEditFormOpen}
      okText="Submit"
      onOk={onUpdate}
      cancelText="Cancel"
      onCancel={() => setIsEditFormOpen(false)}
      className="w-[600px]"
    >
      <Form
        name="editMember"
        form={editForm}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={initialEditData}
        onFinish={onUpdate}
      >
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item name="isArchived" label="IsArchived">
          <Select placeholder="Please select isArchived" options={IS_ARCHIVED_TYPE} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditForm;
