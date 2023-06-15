import { useEffect, useReducer } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

import { useAuthContext } from '@/hooks';
import { AuthContext } from '@/contexts';
import type { TAuthState, TAuthAction } from '@/contexts/AuthContext';

import { DashboardPage, LoginPage, NotFoundPage } from '@/pages';
import { ListMember } from '@/components';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authDispatch } = useAuthContext();
  const token = sessionStorage.getItem('Authorization');

  useEffect(() => {
    (async () => {
      // TODO: axios
      const res = await axios.get('/login', {
        headers: {
          Authorization: token,
        },
      });
      const { State } = res.data;

      if (State === 'Success') {
        message.success('驗證通過');
      } else {
        message.error('驗證沒有通過');
      }
    })();
  }, [authDispatch, token]);

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/dashboard/user/list',
    element: (
      // <ProtectedRoute>
      <DashboardPage />
      // </ProtectedRoute>
    ),
    children: [{ path: '', element: <ListMember /> }],
  },
  {
    path: '/admin/login',
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
