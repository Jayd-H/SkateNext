import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "expo-router";

const VALID_TABS = ["fitness", "map", "settings"];

type NavigationHistoryContextType = {
  history: string[];
  previousTab: string;
  currentTab: string;
  goBack: () => string | null;
};

const NavigationHistoryContext = createContext<NavigationHistoryContextType>({
  history: ["fitness"],
  previousTab: "fitness",
  currentTab: "fitness",
  goBack: () => null,
});

export const useNavigationHistory = () => useContext(NavigationHistoryContext);

export const NavigationHistoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [history, setHistory] = useState<string[]>(["fitness"]);
  const pathname = usePathname();

  useEffect(() => {
    // Extract current tab from pathname (e.g., /tabs/map => 'map')
    const segments = pathname.split("/");
    const currentTab = segments[segments.length - 1];

    // Only track tab-level navigation
    if (VALID_TABS.includes(currentTab)) {
      setHistory((prev) => {
        // Don't add duplicate tabs in succession
        if (prev[prev.length - 1] !== currentTab) {
          return [...prev, currentTab];
        }
        return prev;
      });
    }
  }, [pathname]);

  const getPreviousTab = () => {
    if (history.length > 1) {
      return history[history.length - 2];
    }
    return "fitness";
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      return newHistory[newHistory.length - 1];
    }
    return null;
  };

  return (
    <NavigationHistoryContext.Provider
      value={{
        history,
        previousTab: getPreviousTab(),
        currentTab: history[history.length - 1],
        goBack,
      }}
    >
      {children}
    </NavigationHistoryContext.Provider>
  );
};
