import React, { createContext, useContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);

  return (
    <Context.Provider value={{ tasks, setTasks }}>{children}</Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export default ContextProvider;
