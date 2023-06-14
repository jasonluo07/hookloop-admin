import { Typography } from 'antd';

type PageTitleProps = {
  name: string;
};

function PageTitle({ name }: PageTitleProps) {
  return <Typography.Title level={3}>{name}</Typography.Title>;
}

export default PageTitle;
