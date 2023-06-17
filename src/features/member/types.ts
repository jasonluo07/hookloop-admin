import type { IUser } from '@/types';
import type { Dayjs } from 'dayjs';

export type TRecord = Omit<IUser, 'password' | 'updatedAt'>;
export type TFilterData = Omit<IUser, 'password' | 'avatar'> & { RegisterDateRange: [Dayjs, Dayjs] };
export type TEditData = Pick<IUser, 'email' | 'username' | 'password' | 'isArchived'>;
