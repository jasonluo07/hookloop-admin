import { useAuthContext } from '@/hooks';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { authDispatch } = useAuthContext();
  const { pathname } = location;

  const handleLogin = async (values: { username: string; Password: string }) => {
    setIsLoading(true);
    try {
      // TODO: axios
      const reqEndPoint = `/auth${pathname}`;
      const res = (await axios.post(reqEndPoint, values)) as {
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
        message.success('登入成功');
        navigate('/dashboard');
      } else {
        message.error('登入失敗');
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
        <Form.Item name="username" label="username" rules={[{ required: true, message: '請輸入你的帳號' }]}>
          <Input prefix={<UserOutlined />} placeholder="username" />
        </Form.Item>
        <Form.Item name="Password" label="Password" rules={[{ required: true, message: '請輸入你的密碼' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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
