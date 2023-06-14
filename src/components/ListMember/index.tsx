import { Button, Form, Space, Table, TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import { produce } from 'immer';
import { memo, useEffect, useState } from 'react';

import type { IColumn, TTableParams } from '@/types';
import type { TFilterData, TRow } from './types';
import EditForm from './EditForm';
import FilterForm from './FilterForm';
import * as Locale from '@/utils/locale';

import { PageTitle } from '@/components/UI';
import { POST } from '@/utils';

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
  const [rows, setRows] = useState<TRow[]>([]);
  const [row, setRow] = useState<TRow>({} as TRow);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const columns: IColumn<TRow>[] = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      render: (Status: number) => <span className={`${Status === 0 && 'text-red-500'}`}>{Locale.status(Status)}</span>,
    },
    {
      title: 'Register Date',
      dataIndex: 'RegisterDate',
      render: (RegisterDate: string) => <span>{dayjs(RegisterDate).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'Id',
      render: (_, row) => (
        <Space direction="horizontal">
          <Button
            type="primary"
            onClick={() => {
              setRow(row);
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
      const result = await fetchData(filterData);

      setTableParams(base =>
        produce(base, draft => {
          draft.pagination.total = result.TotalRecord;
          draft.pagination.current = isNewSearch ? 1 : tableParams.pagination.current;
        })
      );
      setRows(result.Data);
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
    //   Data: TRow[];
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
      <PageTitle name="Members" />
      <FilterForm filterFormInstance={filterFormInstance} onSearch={handleSearch} />
      <Table
        dataSource={rows}
        columns={columns}
        rowKey={(record: TRow) => record.Id}
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
          row={row}
        />
      )}
    </>
  );
}

export default memo(ListMember);
