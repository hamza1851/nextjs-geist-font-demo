"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of our global state
interface AppState {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  dashboardData: {
    totalEarning: number;
    orders: number;
    customers: number;
    products: number;
  };
}

// Define action types
type AppAction = 
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'UPDATE_DASHBOARD_DATA'; payload: AppState['dashboardData'] };

// Initial state
const initialState: AppState = {
  user: {
    name: 'Admin User',
    email: 'admin@dashboard.com',
    avatar: 'https://placehold.co/40x40?text=AU'
  },
  dashboardData: {
    totalEarning: 981.35,
    orders: 65802,
    customers: 79958,
    products: 367
  }
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_DASHBOARD_DATA':
      return { ...state, dashboardData: action.payload };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

// Provider component
export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
