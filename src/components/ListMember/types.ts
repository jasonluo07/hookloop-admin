import { IMember } from '@/types';
import type { Dayjs } from 'dayjs';

export type TRow = Omit<IMember, 'Password' | 'UpdateDate'> & { AgentName: string };
export type TFilterData = Pick<IMember, 'Id' | 'Nickname' | 'Account' | 'Status' | 'AGId' | 'Email'> & { CreateDateRange: [Dayjs, Dayjs] };
export type TEditData = Pick<IMember, 'Account' | 'Nickname' | 'Email' | 'Status'>;
