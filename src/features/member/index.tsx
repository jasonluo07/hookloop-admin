import dayjs from 'dayjs';
import { memo, useState } from 'react';
import { Button, Form, Space, Table, TablePaginationConfig, message } from 'antd';
import { getUsersByConditions, updateUserById } from '@/service';
import { PageTitle } from '@/components/UI';
import type { IColumn, TTableParams } from '@/types';
import type { TRecord } from './types';
import EditForm from './EditForm';
import FilterForm from './FilterForm';

function ListMember() {
  const [filterForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TTableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });
  const [dataSource, setDataSource] = useState([]);
  const [record, setRecord] = useState<TRecord>({} as TRecord);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const columns: IColumn<TRecord>[] = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Register Date',
      dataIndex: 'createdAt',
      render: (createdAt: string) => <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</span>,
    },
    // {
    //   title: 'Plan',
    //   dataIndex: 'plan',
    //   render: (plan: number) => {
    //     switch (plan) {
    //       case 0:
    //         return <span className="text-yellow-700">Plan A</span>;
    //       case 1:
    //         return <span className="text-red-700">Plan B</span>;
    //       case 2:
    //         return <span className="text-green-700">Plan C</span>;
    //       default:
    //         return <span>Unknown</span>;
    //     }
    //   },
    // },
    {
      title: 'IsArchived',
      dataIndex: 'isArchived',
      render: (isArchived: boolean) => {
        if (isArchived) {
          return <span className="text-red-500">true</span>;
        } else {
          return <span className="text-green-500">false</span>;
        }
      },
    },
    {
      title: 'Actions',
      dataIndex: 'Id',
      render: (_, record) => (
        <Space direction="horizontal">
          <Button
            type="primary"
            onClick={() => {
              setRecord(record);
              setIsEditFormOpen(true);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    const { username, email, isArchived: formIsArchived, registerDateRange } = filterForm.getFieldsValue();
    const isArchived = formIsArchived === undefined ? undefined : formIsArchived === 1 ? true : false;

    try {
      const { data: usersData } = await getUsersByConditions({
        username: username === '' ? undefined : username,
        email: email === '' ? undefined : email,
        isArchived,
        startDate: registerDateRange?.[0],
        endDate: registerDateRange?.[1],
      });

      const { users } = usersData.data;
      setDataSource(users);
    } catch (error) {
      message.error((error as Error)?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const { username, isArchived: formIsArchived } = editForm.getFieldsValue();
    const isArchived = formIsArchived === undefined ? undefined : formIsArchived === 1 ? true : false;
    const id = record._id;

    try {
      const { data: resData } = await updateUserById(id, { username, isArchived });
      const { message: resMsg } = resData;
      setIsEditFormOpen(false);

      message.success(resMsg);
      handleSearch();
    } catch (error) {
      message.error((error as Error)?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      ...tableParams,
      pagination,
    });
  };

  return (
    <>
      <PageTitle name="User List" />
      <FilterForm filterForm={filterForm} onSearch={handleSearch} />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record: TRecord) => record._id}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={isLoading}
        className="shadow"
      />
      {isEditFormOpen && (
        <EditForm
          isEditFormOpen={isEditFormOpen}
          setIsEditFormOpen={setIsEditFormOpen}
          editForm={editForm}
          onUpdate={handleUpdate}
          record={record}
        />
      )}
    </>
  );
}

export default memo(ListMember);
