import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

function Content() {
  return (
    <Layout.Content className="min-h-[280px] flex-1 px-4 py-2">
      <Outlet />
    </Layout.Content>
  );
}

export default Content;
