import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { ThemeInfoResponseDTO } from "@/types/DTO/themeDTO";

interface ThemeContextType {
  theme: ThemeInfoResponseDTO | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  theme: ThemeInfoResponseDTO | null;
}

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
