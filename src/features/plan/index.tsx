import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Table, TablePaginationConfig, Typography, message, Tag } from 'antd';
import { PageTitle } from '@/components/UI';
import { getPlans } from '@/service';
import type { IPlan, TTableParams } from '@/types';
import { planStatusTagClass } from '../constants';
import FilterForm from './FilterForm';

const PlanOverview = () => {
  const [filterForm] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [tableParams, setTableParams] = useState<TTableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const columns = [
    {
      title: 'Username',
      width: '250',
      render: (el: IPlan) => (
        <Typography.Link underline onClick={() => navigate(`/user/${el.userId._id}/${el.userId.username}`)}>
          {el.userId.username}
        </Typography.Link>
      ),
    },
    {
      title: 'Email',
      width: '250',
      render: (el: IPlan) => el.userId.email,
    },
    {
      title: 'Status',
      width: '100',
      render: (el: IPlan) => <span>{el.name === 'Free' ? '-' : <Tag color={planStatusTagClass[el.status]}>{el.status}</Tag>}</span>,
    },
    {
      title: 'Pay Time',
      width: '250',
      render: (el: IPlan) => <span>{el.name === 'Free' ? '-' : dayjs(el.payTime).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: 'Current Plan',
      dataIndex: 'name',
      width: '100',
    },
    {
      title: 'End Time',
      width: '250',
      render: (el: IPlan) => <span>{el.name === 'Free' ? '-' : dayjs(el.endAt).format('YYYY-MM-DD HH:mm')}</span>,
    },
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    console.log(filterForm.getFieldsValue());
    const { planType, status } = filterForm.getFieldsValue();

    try {
      const { data: usersData } = await getPlans({
        planType,
        status,
      });

      setDataSource(usersData.data.plans);
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
      <PageTitle name="Plan Overview" />
      <FilterForm filterForm={filterForm} onSearch={handleSearch} />
      <Table
        dataSource={dataSource}
        columns={columns}
        // rowKey={(record: TRecord) => record.id}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={isLoading}
        className="shadow"
      />
    </>
  );
};

export default PlanOverview;
