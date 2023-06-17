import Cookies from 'js-cookie';
import instance from '../instance';
import { ILoginArgs } from '../type';

export const login = ({ username, password }: ILoginArgs) => instance.post(`/admin/login`, { username, password });

export const verifyUserToken = () =>
  instance.get('admin/verifyUserToken', {
    headers: {
      Authorization: `Bearer ${Cookies.get('hookloop-admin-token')}`,
    },
  });
