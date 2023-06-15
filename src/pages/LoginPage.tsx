import { useAuthContext } from '@/hooks';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { authDispatch } = useAuthContext();

  const handleLogin = async (values: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = (await axios.post('http://localhost:8080/api/v1/admin/login', values)) as {
        data: { State: string; Token: string };
      };
      const { State, Token } = res.data;

      if (State === 'Success') {
        sessionStorage.setItem('Authorization', Token);
        authDispatch({
          type: 'LOG_IN',
          payload: {
            token: Token,
          },
        });
        message.success('Log in successful!');
        navigate('/dashboard/user/list');
      } else {
        message.error('Log in successful!')
      }
    } catch (errInfo) {
      console.error(errInfo);
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
