import { Route, Router, useLocation, useParams, useRoutes } from 'react-router-dom';

export default function UserDetailPage() {
  const location = useLocation();
  const { id } = useParams();
  console.log('🚀 ~ file: UserDetailPage.tsx:6 ~ UserDetailPage ~ param:', id);
  console.log('🚀 ~ file: UserDetailPage.tsx:5 ~ UserDetailPage ~ location:', location);
  return <>UserDetailPage</>;
}
