import { useEffect, useReducer } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { AuthContext } from '@/contexts';
import type { TAuthState, TAuthAction } from '@/contexts/AuthContext';
import { DashboardPage, LoginPage, NotFoundPage } from '@/pages';
import { ListMember, PlanOverview } from '@/features';
import { verifyUserToken } from '@/service';
import UserTradeInfoPage from './pages/user/TradeInfoPage';
import UserDetailPage from './pages/user/UserDetailPage';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { authDispatch } = useAuthContext();
  const token = Cookies.get('hookloop-admin-token');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await verifyUserToken();
        console.log('data', data);
      } catch (error) {
        message.error((error as Error)?.message || 'Something went wrong. Please try again later.');
      }
    })();
  }, []);

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    children: [
      { path: '/user/list', element: <ListMember /> },
      { path: '/user/tradeInfo', element: <UserTradeInfoPage /> },
      { path: '/user/:id/:name', element: <UserDetailPage /> },
      { path: '/plan', element: <PlanOverview /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const authReducer = (state: TAuthState, action: TAuthAction): TAuthState => {
  switch (action.type) {
    case 'LOG_IN': {
      const { token } = action.payload;
      return { ...state, isLoggedIn: true, token };
    }
    case 'LOG_OUT':
      return { token: null, isLoggedIn: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: TAuthState = {
    token: sessionStorage.getItem('Authorization') ?? null,
    isLoggedIn: false,
  };

  const [authState, authDispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (authState.token) {
      sessionStorage.setItem('Authorization', authState.token);
    }
  }, [authState.token]);

  return <AuthContext.Provider value={{ authDispatch }}>{children}</AuthContext.Provider>;
};

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
