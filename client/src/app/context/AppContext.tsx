"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type AppContextProps = {
  loading: boolean;
  showModal: string | null;
  setShowModal: (modalName: string | null) => void;
};

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<string | null>(null);

  const appContextValue: AppContextProps = {
    loading,
    showModal,
    setShowModal,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {!loading && children}
    </AppContext.Provider>
  );
};

// Custom hook
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
