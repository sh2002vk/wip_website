// THIS FILE IS USED TO SAVE FILTER STATES AND SAVE IT OVER DIFFERENT COMPONENTS. USED IN SEARCH

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Filters {
  availability: number;
  preference: string;
  degreeLevel: string;
  date: Date | null;
  keyword: string;
}

interface FiltersContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  doSearch: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    availability: 0,
    preference: "UNAVAILABLE",
    degreeLevel: "UNAVAILABLE",
    date: null,
    keyword: '',
  });

  // Add a new state to trigger re-render in SearchLayout
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

  const doSearch = () => {
    console.log("Current Filters:", filters);
    // Toggle the searchTrigger to trigger a re-render in components using it
    setSearchTrigger(current => !current);
  };

  const value = { filters, setFilters, doSearch };

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};
