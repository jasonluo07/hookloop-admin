export interface IUsersDataByConditionArgs {
  email?: string;
  startDate?: string;
  endDate?: string;
  isArchived?: boolean;
  username?: string;
}

export interface IUpdateUserByIdArgs {
  username?: string;
  isArchived?: boolean;
}

export interface ILoginArgs {
  username: string;
  password: string;
}
