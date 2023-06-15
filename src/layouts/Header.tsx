import { Layout, Button, Avatar, Popover, Divider, Popconfirm, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks';

type HeaderProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ isCollapsed, setIsCollapsed }: HeaderProps) {
  const navigate = useNavigate();
  const { authDispatch } = useAuthContext();

  const text = (
    <div className="flex h-[64px] w-[280px] px-3">
      <div className="leading-[64px]">
        <Avatar size={64} src="/src/assets/user.jpg" />
      </div>
      <div className="flex grow flex-col justify-around text-center">
        <div className="text-lg">Alice</div>
      </div>
    </div>
  );

  const handleLogout = () => {
    sessionStorage.removeItem('Authorization');
    authDispatch({
      type: 'LOG_OUT',
    });
    message.success('Log out successfully');
    navigate('/login');
  };

  const content = (
    <>
      <Divider />
      <div className="flex w-[280px] justify-between px-3 pb-2">
        <Button type="primary">Change Password</Button>
        <Popconfirm title="Are you sure you want to log out?" onConfirm={handleLogout} okText="Yes" cancelText="No">
          <Button type="primary" danger>
            Log Out
          </Button>
        </Popconfirm>
      </div>
    </>
  );

  return (
    <Layout.Header className="flex items-center justify-between bg-[#001529] p-0">
      <Button
        type="text"
        icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="h-16 w-16 text-[16px] text-white"
      />
      <Popover placement="bottomRight" title={text} content={content} trigger="click">
        <Avatar size={48} icon={<UserOutlined />} className="mr-4 cursor-pointer" />
      </Popover>
    </Layout.Header>
  );
}

export default Header;
