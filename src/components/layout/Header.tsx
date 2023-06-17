import { Layout, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks';

function Header() {
  const navigate = useNavigate();
  const { authDispatch } = useAuthContext();

  const handleLogout = () => {
    sessionStorage.removeItem('Authorization');
    authDispatch({
      type: 'LOG_OUT',
    });
    message.success('Log out successfully');
    navigate('/login');
  };

  return (
    <Layout.Header className="flex items-center justify-end bg-[#001529] p-0">
      <div className="flex w-[280px] justify-end px-3 pb-2">
        <Popconfirm title="Are you sure you want to log out?" onConfirm={handleLogout} okText="Yes" cancelText="No">
          <Button type="primary" danger>
            Log Out
          </Button>
        </Popconfirm>
      </div>
    </Layout.Header>
  );
}

export default Header;
