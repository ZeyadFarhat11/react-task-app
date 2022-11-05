import React, { createContext, useContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (loading) setLoading(false);
    }, 3000);
  }, []);

  return (
    <Context.Provider value={{ tasks, setTasks, loading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export default ContextProvider;
