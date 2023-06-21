import type { FormInstance, TablePaginationConfig } from 'antd';

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  isArchived: boolean;
  lastActiveTime: Date;
  createdAt: Date;
  updatedAt: Date;
  currentPlan?: IPlan;
}

export interface IColumn<T> {
  title: string;
  dataIndex?: string;
  width?: string;
  sorter?: boolean;
  render?: (text: any, record: T) => JSX.Element;
  align?: 'left' | 'right' | 'center';
}

export interface IOption<T = number> {
  label: string;
  value: T;
}

export type FilterFormProps<T> = {
  filterForm: FormInstance;
  // onSearch: (filterData: T, isNewSearch: boolean) => Promise<void>;
  onSearch: () => Promise<void>;
  onChange?: (filterData: T) => void;
  filterOptions?: any;
};

export type EditFormProps<T, U> = {
  editForm: FormInstance;
  isEditFormOpen: boolean;
  setIsEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // onSearch: (filterData: T, isNewSearch: boolean) => Promise<void>;
  onUpdate: () => Promise<void>;
  record: U;
};

export type TTableParams = {
  pagination: TablePaginationConfig;
};

export interface IPlan {
  name: 'Free' | 'Standard' | 'Premium';
  price: number;
  endAt: Date;
  userId: string;
  status: 'UN-PAID' | 'NONE' | 'PAY-SUCCESS' | 'PAY-FAIL';
  createdAt: string;
  updatedAt: string;
  merchantOrderNo: string;
  paymentType: string;
  payBankCode?: string;
  payerAccount5Code?: string;
  payTime: string;
}

export enum PayStatus {
  'UN-PAID',
  'NONE',
  'PAY-SUCCESS',
  'PAY-FAIL',
}
export interface IPlansConditions {
  userId: string;
  username: string;
  email: string;
  planType?: 'Free' | 'Standard' | 'Premium';
  payTime?: string;
  status?: PayStatus;
  merchantOrderNo?: string;
}
