import { createContext } from 'react';

type TRole = 'ACT' | 'AG';

export type TAuthState = {
  token: string | null;
  isLoggedIn: boolean;
  role: TRole | null;
};

export type TAuthAction = { type: 'LOG_IN'; payload: Pick<TAuthState, 'token'> } | { type: 'LOG_OUT' };

type TAuthContext = {
  authDispatch: React.Dispatch<TAuthAction>;
};

const AuthContext = createContext<TAuthContext | null>(null);

export default AuthContext;
