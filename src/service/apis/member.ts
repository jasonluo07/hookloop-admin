import { AxiosResponse } from 'axios';
import instance, { IApiResponse } from '../instance';
import { IUsersDataByConditionArgs, IUpdateUserByIdArgs } from '../type';
import { IPlan, IPlansConditions } from '@/types';

export const getUsersByConditions = (data: IUsersDataByConditionArgs) => instance.post('/admin/users', { ...data });

export const getUserById = (id: string) => instance.get(`/admin/users/${id}`);

export const updateUserById = (id: string, data: IUpdateUserByIdArgs) => instance.patch(`/admin/users/${id}`, { ...data });

export const getPlansByUserId = (
  userId: string
): Promise<
  AxiosResponse<
    IApiResponse<{
      plans: IPlan[];
      user?: {
        username: string;
        email: string;
      };
    }>
  >
> => instance.get(`/admin/plans/${userId}`);

export const getPlansByConditions = (
  conditions: IPlansConditions
): Promise<
  AxiosResponse<
    IApiResponse<{
      plans: IPlan[];
      user?: {
        username: string;
        email: string;
      };
    }>
  >
> => instance.post('/admin/plans/user', conditions);
