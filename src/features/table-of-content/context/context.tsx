import React, { createContext, useContext, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export type ActiveSection = {
  level: number;
  sectionId: string;
};

export type ContextType = {
  activeSection: ActiveSection;
  setActiveSection: (activeSection: ActiveSection) => void;
  resetActiveSection: () => void;
};

export const Context = createContext<ContextType | null>(null);

const DEFAULT_VALUE = {
  level: -1,
  sectionId: "",
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [activeSection, setActiveSection] =
    useState<ActiveSection>(DEFAULT_VALUE);

  const context: ContextType = useMemo(
    () => ({
      activeSection,
      setActiveSection: (activeSection) => setActiveSection(activeSection),
      resetActiveSection: () => setActiveSection(DEFAULT_VALUE),
    }),
    [activeSection]
  );

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useTOCContext = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useTOCContext should use in Context.Provider");
  }

  return context;
};
