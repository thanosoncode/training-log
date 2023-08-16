import { createContext, useContext, useReducer } from 'react';
import { CardioWorkoutFromServer, StrengthWorkoutServer } from '../utils/models';

export type AppState = {
  allCardio: CardioWorkoutFromServer[];
  allStrength: StrengthWorkoutServer[];
  selectedStrengthId: string;
  selectedCardioId: string;
  month: number;
  year: number;
};

const defaultState: AppState = {
  allCardio: [],
  allStrength: [],
  selectedStrengthId: '',
  selectedCardioId: '',
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear()
};

type Dispatch = (action: Action) => void;
type Action =
  | { type: 'SET_ALL_CARDIO'; payload: CardioWorkoutFromServer[] }
  | { type: 'SET_ALL_STRENGTH'; payload: StrengthWorkoutServer[] }
  | { type: 'SET_SELECTED_CARDIO_ID'; payload: string }
  | { type: 'SET_SELECTED_STRENGTH_ID'; payload: string }
  | { type: 'MONTH_INCREASE' }
  | { type: 'MONTH_DECREASE' }
  | { type: 'SET_MONTH'; payload: number }
  | { type: 'SET_YEAR'; payload: number };

const AppStateContext = createContext<AppState | null>(null);
const AppDispatchContext = createContext<Dispatch | null>(null);

const appReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'SET_ALL_CARDIO':
      return { ...state, allCardio: action.payload };
    case 'SET_ALL_STRENGTH':
      return { ...state, allStrength: action.payload };
    case 'SET_SELECTED_STRENGTH_ID':
      return { ...state, selectedStrengthId: action.payload };
    case 'SET_SELECTED_CARDIO_ID':
      return { ...state, selectedCardioId: action.payload };
    case 'MONTH_INCREASE':
      return { ...state, month: state.month + 1 };
    case 'MONTH_DECREASE':
      return { ...state, month: state.month - 1 };
    case 'SET_MONTH':
      return { ...state, month: action.payload };
    case 'SET_YEAR':
      return { ...state, year: action.payload };
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
