import { useState } from 'react';
import { Layout } from 'antd';
import { Footer, Header, Sider, Content } from '@/components/layout';

function DashboardPage() {
  // const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
}

export default DashboardPage;
