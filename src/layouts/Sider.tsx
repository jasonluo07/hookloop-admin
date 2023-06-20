import { Layout, Menu } from 'antd';
import { TeamOutlined, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
            <Link to="user/list" className="text-inherit">
              User List
            </Link>
          ),
          key: 'user/list',
        },
        {
          label: (
            <Link to="a/list" className="text-inherit">
              A List
            </Link>
          ),
          key: 'a/list',
        },
        {
          label: (
            <Link to="b/list" className="text-inherit">
              B List
            </Link>
          ),
          key: 'b/list',
        },
        {
          label: (
            <Link to="c/list" className="text-inherit">
              C List
            </Link>
          ),
          key: 'c/list',
        },
      ],
    },
    {
      key: 'sub2',
      icon: <ShopOutlined />,
      label: 'Team Management',
      children: [
        {
          label: (
            <Link to="d/list" className="text-inherit">
              D List
            </Link>
          ),
          key: 'd/list',
        },
        {
          label: (
            <Link to="e/list" className="text-inherit">
              E List
            </Link>
          ),
          key: 'e/list',
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
        <img src="/src/assets/logo.svg" className="h-8 w-8" />
        <a href="/dashboard/user/list" className="text-white">
          HookLoop
        </a>
      </div>
      <div className="flex h-16 items-center gap-4 pl-6">
        <div>
          <img src="/src/assets/user.jpg" className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
          <div>Alice</div>
        </div>
      </div>
      <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} items={menuItems} />
    </Layout.Sider>
  );
}

export default Sider;
