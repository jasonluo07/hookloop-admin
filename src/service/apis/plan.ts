import instance from '../instance';
import { IPlansConditions } from '@/types';

export const getPlans = (data: IPlansConditions) => instance.post(`/admin/plans/user`, { ...data });
