"use client";

import { createContext, ReactNode, useState } from "react";

// Subcategory interface
interface ISubcategory {
  name: string;
  selected: boolean; // Indicates if the subcategory is selected or not.
}

// Category interface that contains an array of subcategories
interface ICategory {
  name: string;
  subcategories: ISubcategory[]; // An array of subcategories.
}

// Product interface that includes a category
interface IProduct {
  name: string;
  description: string;
  category: ICategory; // A product has one category.
  createdAt: Date; // Timestamp for when the product was created.
}

// Context value type
type AppContextProps = {
  productsData: IProduct[];
  loading: boolean;
};

// Creating the context with an initial undefined value
const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productsData, setProductsData] = useState<IProduct[]>([]);

  // Context value
  const appContextValue: AppContextProps = {
    productsData,
    loading,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
