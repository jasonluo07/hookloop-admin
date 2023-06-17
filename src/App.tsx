import { useEffect, useReducer } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { message } from 'antd';
import { useAuthContext } from '@/hooks';
import { AuthContext } from '@/contexts';
import type { TAuthState, TAuthAction } from '@/contexts/AuthContext';

import { DashboardPage, LoginPage, NotFoundPage } from '@/pages';
import { ListMember } from '@/features';
import { login, verifyUserToken } from '@/service';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authDispatch } = useAuthContext();
  const token = sessionStorage.getItem('Authorization');

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
    // path: '*',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    children: [{ path: '', element: <ListMember /> }],
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
