import instance from './instance';
import { IUsersDataByConditionArgs } from './type';

export const getUsersByConditions = (data: IUsersDataByConditionArgs) => instance.post('/admin/users', { ...data });

export const getUserById = (id: string) => instance.get(`/admin/users/${id}`);

export const updateUserById = (id: string, data: any) => instance.patch(`/admin/users/${id}`, { ...data });
