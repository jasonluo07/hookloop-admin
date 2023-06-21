// import Cookies from 'js-cookie';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
const rootUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

export interface IApiResponse<T = any> {
  status: 'success' | 'fail' | 'error';
  message: string;
  data: T;
}

// const token = Cookies.get("hookloop-token");
const instance: AxiosInstance = axios.create({
  baseURL: `${rootUrl}/api/v1`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${Cookies.get('hookloop-token')}`, // 在標頭中設定 Authorization
  },
  // 跨域存取cookies 等待後端設定 cors
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status } = response.data as IApiResponse;

    if (status === 'success') {
      const { data, message } = response.data;
      response.data = {
        data,
        message,
        status,
      };
    } else if (status === 'fail') {
      const { message, data } = response.data;
      response.data = {
        data,
        message,
        status: 'fail',
      };
    } else {
      response.data = {
        data: {},
        message: 'Programming Error',
        status: 'fail',
      };
    }
    return response;
  },
  error => {
    if (error.response) {
      const { message, data } = error.response.data;
      const modifiedResponse: AxiosResponse<IApiResponse> = {
        ...error.response,
        data: {
          data,
          message,
          status: 'fail',
        },
      };
      return modifiedResponse;
    }

    return {
      ...error.response,
      data: {
        data: {},
        message: 'Programming Error',
        status: 'fail',
      },
    };
  }
);

export default instance;
