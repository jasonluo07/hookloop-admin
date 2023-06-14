import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts';
import { IDialogState } from '@/types';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuthContext has to be used within <AuthContext.Provider>');
  }

  return authContext;
};

export const useDialogState = (initialState: boolean): IDialogState => {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
