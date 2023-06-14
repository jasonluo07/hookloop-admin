import { useState } from 'react';
import { Layout } from 'antd';
import { Footer, Header, Sider, Content } from '@/layouts';

function DashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sider isCollapsed={isCollapsed} />
      <Layout>
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
}

export default DashboardPage;
