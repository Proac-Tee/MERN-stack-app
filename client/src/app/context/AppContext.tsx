"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type AppContextProps = {
  loading: boolean;
  showModal: string | null;
  showDropdown: boolean;
  openProfile: boolean;
  dropdownProductId: string | null;
  errors: { [key: string]: string } | null;
  updateErrors: { [key: string]: string } | null;
  setShowModal: (modalName: string | null) => void;
  setShowDropdown: (dropdownState: boolean) => void;
  setDropdownProductId: (productId: string | null) => void;
  setErrors: (errors: { [key: string]: string } | null) => void;
  setUpdateErrors: (errors: { [key: string]: string } | null) => void;
  setOpenProfile: (profileState: boolean) => void;
};

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownProductId, setDropdownProductId] = useState<string | null>(
    null
  );
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
  const [updateErrors, setUpdateErrors] = useState<{
    [key: string]: string;
  } | null>(null);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const appContextValue: AppContextProps = {
    loading,
    showModal,
    setShowModal,
    showDropdown,
    dropdownProductId,
    setShowDropdown,
    setDropdownProductId,
    errors,
    setErrors,
    updateErrors,
    setUpdateErrors, openProfile, setOpenProfile
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
