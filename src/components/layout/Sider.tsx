import { Layout, Menu } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo_white.svg';

type SiderProps = {
  isCollapsed: boolean;
};

function Sider({ isCollapsed }: SiderProps) {
  const menuItems = [
    {
      key: 'sub1',
      icon: <TeamOutlined />,
      label: 'Account Management',
      children: [
        {
          label: (
            <Link to={'user/list'} className="text-inherit">
              User List
            </Link>
          ),
          key: 'user/list',
        },
        {
          label: (
            <Link to={'user/tradeInfo'} className="text-inherit">
              User TradeInfo
            </Link>
          ),
          key: 'user/tradeInfo',
        },
      ],
    },
  ];

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      width={250}
      collapsedWidth={72}
      theme="dark"
      className="overflow-y-auto overflow-x-hidden whitespace-nowrap text-white"
    >
      <div className="flex h-16 items-center gap-4 pl-6 ">
        <a href="/" className="text-white">
          <img src={logo} className="h-10 w-40" />
        </a>
      </div>
      <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} items={menuItems} />
    </Layout.Sider>
  );
}

export default Sider;
