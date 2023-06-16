import type { FormInstance, TablePaginationConfig } from 'antd';

export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  isArchived: boolean;
  lastActiveTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IColumn<T> {
  title: string;
  dataIndex: string;
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
  filterFormInstance: FormInstance;
  // onSearch: (filterData: T, isNewSearch: boolean) => Promise<void>;
  onSearch: () => Promise<void>;
  onChange?: (filterData: T) => void;
  filterOptions?: any;
};

export type EditFormProps<T, U> = {
  filterFormInstance: FormInstance;
  isEditFormOpen: boolean;
  setIsEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (filterData: T, isNewSearch: boolean) => Promise<void>;
  record: U;
};

export type TTableParams = {
  pagination: TablePaginationConfig;
};
