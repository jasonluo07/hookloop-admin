import dayjs from 'dayjs';
import { PageTitle } from '@/components/UI';
import { IColumn, IPlan, IPlansConditions } from '@/types';
import { Table, message, Form, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlansByConditions, getPlansByUserId } from '@/service';
import FilterForm from './filterForm';
import { SelectOutlined } from '@ant-design/icons';

export default function UserDetailPage() {
  const param = useParams();
  const navigate = useNavigate();
  const [filterForm] = Form.useForm<IPlansConditions>();
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IPlan[]>([]);

  const columns: IColumn<IPlan>[] = [
    {
      title: 'MerchantOrderNo',
      dataIndex: 'merchantOrderNo',
      width: '150',
    },
    {
      title: 'Plan',
      width: '100',
      render: (row: IPlan) => {
        if (row?.name) {
          return <span>{row?.name}</span>;
        }
        return <span>--</span>;
      },
    },
    {
      title: 'Status',
      render: (row: IPlan) => <Tag>{row.status}</Tag>,
    },
    {
      title: 'Amount',
      width: '250',
      render: (row: IPlan) => <span>$ {row.price}</span>,
    },
    {
      title: 'Payment Type',
      render: (row: IPlan) => <span>{row.paymentType || '--'}</span>,
    },
    {
      title: 'Pay Time',
      render: (row: IPlan) => <span>{row.payTime || '--'}</span>,
    },
    {
      title: 'Period',
      width: '100',
      render: (row: IPlan) => {
        const endTime = dayjs(row.endAt);
        const startTime = endTime.subtract(30, 'day');

        return (
          <span>
            {startTime.format('YYYY-MM-DD')} ~ {endTime.format('YYYY-MM-DD')}
          </span>
        );
      },
    },
  ];

  const getPlanByUserId = async (userId: string) => {
    setIsLoading(true);

    try {
      const res = await getPlansByUserId(userId);

      filterForm.setFieldsValue({
        userId: userId,
        username: res.data.data.user?.username,
        email: res.data.data.user?.email,
      });
      setDataSource(res.data.data.plans);
    } catch (error) {
      message.error((error as Error)?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (userId: string) => {
    setIsLoading(true);
    const { username, email, planType, payTime, status, merchantOrderNo } = filterForm.getFieldsValue();

    try {
      const res = await getPlansByConditions({
        userId,
        username,
        email,
        planType,
        payTime: payTime && dayjs(payTime).toISOString(),
        status,
        merchantOrderNo,
      });
      console.log('🚀 ~ file: UserDetailPage.tsx:87 ~ handleSearch ~ res:', res.data.data.plans);

      setDataSource(res.data.data.plans);
    } catch (error) {
      message.error((error as Error)?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (param.id) {
      filterForm.resetFields();
      getPlanByUserId(param.id);
    }
  }, [param.id]);

  return (
    <>
      <Space>
        <SelectOutlined className="cursor-pointer text-base hover:text-green-500" onClick={() => navigate('/user/list')} />
        <PageTitle name={`User Trade Records : ${param.name}`} />
      </Space>
      <FilterForm filterForm={filterForm} onSearch={() => handleSearch(param.id || '')} />
      <Table dataSource={dataSource} columns={columns} rowKey={record => record.createdAt} loading={isLoading} className="shadow" />
    </>
  );
}
