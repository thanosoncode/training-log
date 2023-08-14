import { createContext, useContext, useReducer } from 'react';

export type AppState = {
  month: number;
};

const defaultState: AppState = {
  month: new Date().getMonth() + 1
};

type Dispatch = (action: Action) => void;
type Action = { type: 'MONTH_INCREASE' } | { type: 'MONTH_DECREASE' } | { type: 'SET_MONTH'; payload: number };

const AppStateContext = createContext<AppState | null>(null);
const AppDispatchContext = createContext<Dispatch | null>(null);

const appReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'MONTH_INCREASE':
      return { ...state, month: state.month + 1 };
    case 'MONTH_DECREASE':
      return { ...state, month: state.month - 1 };
    case 'SET_MONTH':
      return { ...state, month: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}> {children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('Context must be used inside a provider');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw new Error('Context must be used inside a provider');
  }
  return context;
};

export default AppProvider;
