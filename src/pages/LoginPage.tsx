import Cookies from 'js-cookie';
import { useAuthContext } from '@/hooks';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/service';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { authDispatch } = useAuthContext();

  const handleLogin = async (values: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const { data: resData } = await login(values);
      const { data, message: resMessage, status } = resData;

      const { token, error: resError } = data;
      console.log('resData', resData);

      if (status === 'success') {
        Cookies.set('hookloop-admin-token', token);
        authDispatch({
          type: 'LOG_IN',
          payload: { token },
        });
        message.success(resMessage || 'Log in successful!');
        navigate('/');
      } else {
        message.error(resError || resMessage);
      }
    } catch (error) {
      console.log('error', error);
      message.error((error as Error)?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="flex h-screen items-center justify-center">
      <h1 className="text-2xl">HookLoop</h1>
      <Form name="login" layout="horizontal" onFinish={handleLogin} className="w-[380px] bg-white px-10 py-6 shadow-lg">
        <h2 className="mb-5 text-center text-base">Welcome to log in</h2>
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter your username' }]}>
          <Input prefix={<UserOutlined />} placeholder="username" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} className="w-full">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default LoginPage;
