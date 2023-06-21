import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { Button, Form, Space, Table, TablePaginationConfig, Typography, message } from 'antd';
import { getUsersByConditions, updateUserById } from '@/service';
import { PageTitle } from '@/components/UI';
import type { IColumn, IPlan, TTableParams } from '@/types';
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
      title: 'Username',
      width: '250',
      render: (row: TRecord) => (
        <Typography.Link underline href={`/user/${row.id}/${row.username}`}>
          {row.username}
        </Typography.Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '250',
    },
    {
      title: 'Register Date',
      dataIndex: 'createdAt',
      width: '250',
      render: (createdAt: string) => <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: 'Current Plan',
      dataIndex: 'currentPlan',
      width: '100',
      render: (currentPlan: IPlan) => {
        if (currentPlan?.name) {
          return <span>{currentPlan?.name}</span>;
        }
        return <span>--</span>;
      },
    },
    {
      title: 'IsArchived',
      dataIndex: 'isArchived',
      width: '100',
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
      width: '50',
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
    console.log(filterForm.getFieldsValue());
    const { username, email, isArchived: formIsArchived, registerDateRange, planType } = filterForm.getFieldsValue();
    const isArchived = formIsArchived === undefined ? undefined : formIsArchived === 1 ? true : false;

    try {
      const { data: usersData } = await getUsersByConditions({
        username: username === '' ? undefined : username,
        email: email === '' ? undefined : email,
        isArchived,
        startDate: registerDateRange?.[0],
        endDate: registerDateRange?.[1],
        planType,
      });

      setDataSource(usersData.data);
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
    const id = record.id;

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

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <PageTitle name="User List" />
      <FilterForm filterForm={filterForm} onSearch={handleSearch} />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record: TRecord) => record.id}
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

// export default memo(ListMember);
export default ListMember;
