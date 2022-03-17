import React, { useContext, useReducer } from "react";

type State = {
  isVisibleMenu: boolean;
  isVisibleOverlay: boolean;
};
type Action = { type: "toggleMenu" | "toggleOverlay" | "closeOverlay" };
type Dispatch = (action: Action) => void;
type AppProviderProps = { children: React.ReactNode };

const AppStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case "toggleMenu": {
      return { ...state, isVisibleMenu: !state.isVisibleMenu };
    }
    case "toggleOverlay": {
      return { ...state, isVisibleOverlay: !state.isVisibleOverlay };
    }
    case "closeOverlay": {
      return { ...state, isVisibleOverlay: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }: AppProviderProps) {
  const initialValue: State = {
    isVisibleMenu: false,
    isVisibleOverlay: false,
  };

  const [state, dispatch] = useReducer(appReducer, initialValue);

  const value = { state, dispatch };
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
function useApp() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a CountProvider");
  }
  return context;
}
export { AppProvider, useApp };
