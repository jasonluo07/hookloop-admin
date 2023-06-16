import dayjs from 'dayjs';
import { memo, useState } from 'react';
import { Button, Form, Space, Table, TablePaginationConfig, message } from 'antd';
import { getUsersByConditions } from '@/api';
import { PageTitle } from '@/components/UI';
import type { IColumn, TTableParams } from '@/types';
import type { TRecord } from './types';
import EditForm from './EditForm';
import FilterForm from './FilterForm';

function ListMember() {
  const [filterFormInstance] = Form.useForm();
  const [isSearching, setIsSearching] = useState(false);
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
    setIsSearching(true);
    const { planType, email, isArchived, registerDateRange } = filterFormInstance.getFieldsValue();

    try {
      const { data: usersData } = await getUsersByConditions({
        planType,
        email: email === '' ? undefined : email,
        isArchived: isArchived === 1,
        startDate: registerDateRange?.[0],
        endDate: registerDateRange?.[1],
      });

      const { users } = usersData.data;
      setDataSource(users);
    } catch (error) {
      message.error((error as Error)?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSearching(false);
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
      <FilterForm filterFormInstance={filterFormInstance} onSearch={handleSearch} />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record: TRecord) => record._id}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={isSearching}
        className="shadow"
      />
      {isEditFormOpen && (
        <EditForm
          isEditFormOpen={isEditFormOpen}
          setIsEditFormOpen={setIsEditFormOpen}
          filterFormInstance={filterFormInstance}
          onSearch={handleSearch}
          record={record}
        />
      )}
    </>
  );
}

export default memo(ListMember);
