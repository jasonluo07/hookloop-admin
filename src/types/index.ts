import { FormInstance, TablePaginationConfig } from 'antd';

export interface IAccount {
  Id: number;
  Account: string;
  Password: string;
  Name: string;
  Status: number;
  Permission: number;
  CreateDate: string;
  UpdateDate: string;
}

export interface IAgent {
  Id: number;
  Account: string;
  Password: string;
  Name: string;
  RefCode: string;
  Phone: string;
  Email: string;
  Status: number;
  RegisterIP: string;
  Remark: string;
  CreateDate: string;
  UpdateDate: string;
}

export interface IMember {
  Id: number;
  Account: string;
  Password: string;
  Nickname: string;
  AGId: number;
  Email: string;
  Status: number;
  CreateDate: string;
  UpdateDate: string;
}

export interface ITable<T> {
  PageSize: number;
  PageCount: number;
  PageIndex: number;
  Rows: T[];
}

export interface IColumn<T> {
  title: string;
  dataIndex: string;
  width?: string;
  sorter?: boolean;
  render?: (text: any, row: T) => JSX.Element;
  align?: 'left' | 'right' | 'center';
}

export interface IOption<T = number> {
  label: string;
  value: T;
}

export interface IDialogState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export type FilterFormProps<T> = {
  filterFormInstance: FormInstance;
  onSearch: (filterData: T, isNewSearch: boolean) => Promise<void>;
  onChange?: (filterData: T) => void;
  filterOptions?: any;
};

export type AddCompProps<T> = {
  filterFormInstance: FormInstance;
  isAddCompOpen: boolean;
  setIsAddCompOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (filterData: T, isNewSearch: boolean) => Promise<void>;
};

export type EditFormProps<T, U> = {
  filterFormInstance: FormInstance;
  isEditFormOpen: boolean;
  setIsEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (filterData: T, isNewSearch: boolean) => Promise<void>;
  row: U;
};

export type TTableParams = {
  pagination: TablePaginationConfig;
};
