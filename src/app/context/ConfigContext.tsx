import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConfigContextProps {
  numberOfEntriesToDisplay: number;
  setNumberOfEntriesToDisplay: (value: number) => void;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [numberOfEntriesToDisplay, setNumberOfEntriesToDisplay] = useState(10);

  return (
    <ConfigContext.Provider
      value={{ numberOfEntriesToDisplay, setNumberOfEntriesToDisplay }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
