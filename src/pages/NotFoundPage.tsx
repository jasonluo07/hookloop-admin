import { Button, Layout, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/dashboard/user/list');
  };

  return (
    <Layout className="flex h-screen items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        }
      />
    </Layout>
  );
}

export default NotFoundPage;
