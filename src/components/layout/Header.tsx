import { Layout, Button, Popconfirm, message, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks';
import logo from '@/assets/logo_white.svg';
import { TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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

  const menuItems = [
    {
      key: 'sub1',
      icon: <TeamOutlined />,
      label: (
        <Link to={'user/list'} className="text-inherit">
          User List
        </Link>
      ),
    },
  ];

  return (
    <Layout.Header className="flex justify-between bg-[#001529] p-0">
      <div className="flex items-center gap-4 pl-6 ">
        <a onClick={() => navigate('/user/list')} className="text-white">
          <img src={logo} className="h-10 w-40" />
        </a>
      </div>
      <Menu theme="dark" mode="horizontal" defaultOpenKeys={['sub1']} items={menuItems} className="ml-5 w-[80%]" />
      <div className="flex w-[280px] items-center justify-end px-5">
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
