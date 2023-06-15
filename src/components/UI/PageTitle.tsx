import { Typography } from 'antd';

type PageTitleProps = {
  name: string;
};

function PageTitle(props: PageTitleProps) {
  const { name } = props;
  return <Typography.Title level={3}>{name}</Typography.Title>;
}

export default PageTitle;
