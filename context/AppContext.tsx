'use client';

import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
} from 'react';

interface IAppContext {
  value: IAppContextValue;
  setValue: (value: Partial<IAppContextValue>) => void;
}

interface IAppContextValue {
  orderNumber: string;
  email: string;
}

const initialValue: IAppContextValue = {
  orderNumber: '',
  email: '',
};

const AppContext = createContext<IAppContext | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<IAppContextValue>(initialValue);

  const update = useCallback(
    (v: Partial<IAppContextValue>) => {
      setValue({
        ...value,
        ...v,
      });
    },
    [value]
  );

  const ctxValue = useMemo(() => {
    return {
      value,
      setValue: update,
    };
  }, [value]);

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Need to wrap AppProvider');
  }

  return context;
}
