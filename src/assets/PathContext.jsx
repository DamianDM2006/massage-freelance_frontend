import { createContext, useContext, useState } from "react";

const PathContext = createContext();

export const PathProvider = ({ children }) => {
  const [origin, setOrigin] = useState("home");
  const [destination, setDestination] = useState(null);
  const [isExisting, setIsExisting] = useState(false);

  const value = {
    origin,
    setOrigin,
    destination,
    setDestination,
    isExisting,
    setIsExisting
  };

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>
};

export const usePath = () => {
  const context = useContext(PathContext);
  if (!context) throw new Error("usePath must be used within a PathProvider.");
  return context
};
