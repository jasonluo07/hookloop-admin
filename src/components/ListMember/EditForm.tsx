import { Form, Input, message, Modal, Select, Typography } from 'antd';

import type { EditFormProps } from '@/types';
import type { TFilterData, TEditData, TRow } from './types';

const { Title } = Typography;

function EditForm(props: EditFormProps<TFilterData, TRow>) {
  const { isEditFormOpen, setIsEditFormOpen, filterFormInstance, onSearch, row } = props;
  const [form] = Form.useForm();
  const initEditData = {
    Account: row.Account,
    Nickname: row.Nickname,
    Email: row.Email,
    Status: row.Status,
  };

  const handleEdit = async (values: TEditData) => {
    console.log('values', values);
    // TODO: axios
    message.error('尚未完成');
  };

  return (
    <Modal
      title={<Title level={4}>編輯</Title>}
      open={isEditFormOpen}
      okText="確認"
      onOk={form.submit}
      cancelText="取消"
      onCancel={() => setIsEditFormOpen(false)}
      className="w-[600px]"
    >
      <Form
        name="editMember"
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={initEditData}
        onFinish={handleEdit}
      >
        <Form.Item name="Account" label="帳號">
          <Input disabled />
        </Form.Item>
        <Form.Item name="Nickname" label="名稱">
          <Input />
        </Form.Item>
        <Form.Item name="Email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="Status" label="狀態">
          <Select
            placeholder="請選擇狀態"
            options={[
              { value: 0, label: '凍結' },
              { value: 1, label: '正常' },
            ]}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditForm;
