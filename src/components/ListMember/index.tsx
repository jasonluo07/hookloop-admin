import { Button, Form, Space, Table, TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';

import type { IColumn, TTableParams } from '@/types';
import type { TFilterData, TRecord } from './types';
import EditForm from './EditForm';
import FilterForm from './FilterForm';

import { PageTitle } from '@/components/UI';

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
  const [rows, setRows] = useState<TRecord[]>([]);
  const [record, setRecord] = useState<TRecord>({} as TRecord);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const columns: IColumn<TRecord>[] = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Register Date',
      dataIndex: 'RegisterDate',
      render: (RegisterDate: string) => <span>{dayjs(RegisterDate).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
    },
    {
      title: 'isArchived',
      dataIndex: 'isArchived',
      // render: (isArchived: number) => <span className={`${isArchived === 0 && 'text-red-500'}`}>{Locale.status(isArchived)}</span>,
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

  const handleSearch = async (filterData: TFilterData, isNewSearch: boolean) => {
    setIsSearching(true);
    try {
      // TODO axios
      console.log('handleSearch');
      // const result = await fetchData(filterData);

      // setTableParams(base =>
      //   produce(base, draft => {
      //     draft.pagination.total = result.TotalRecord;
      //     draft.pagination.current = isNewSearch ? 1 : tableParams.pagination.current;
      //   })
      // );
      // setRows(result.Data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const fetchData = async (filterData: TFilterData) => {
    // TODO: axios
    // const result = axios.get('http://localhost:3000/users');
    // console.log('result', result);

    // const result = (await POST(...., {
    //   ...filterData,
    //   PageIndex: tableParams.pagination.current,
    //   PageSize: tableParams.pagination.pageSize,
    // })) as {
    //   State: 'Success' | 'Fail' | 'Error';
    //   TotalRecord: number;
    //   Data: TRecord[];
    //   Message?: string;
    // };

    // if (result.State === 'Success') return result;
    throw new Error('fetchData error');
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      ...tableParams,
      pagination,
    });
  };

  useEffect(() => {
    handleSearch(filterFormInstance.getFieldsValue(), false);
  }, [tableParams.pagination.current]);

  return (
    <>
      <PageTitle name="Users" />
      <FilterForm filterFormInstance={filterFormInstance} onSearch={handleSearch} />
      <Table
        dataSource={rows}
        columns={columns}
        rowKey={(record: TRecord) => record.id}
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
