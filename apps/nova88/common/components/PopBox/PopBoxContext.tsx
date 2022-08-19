import React, { createContext, ReactNode, useState } from "react";
import { PopBoxContextInterface, PopBoxInterface } from "./type";

const PopBoxContext = createContext<PopBoxContextInterface>(null);

const PopBoxProvider = ({ children }: { children: ReactNode }) => {
  const [popBoxType, setPopBoxType] = useState<PopBoxInterface>({ type: "" });

  const closePopBox = () => {
    setPopBoxType({ type: null });
  };

  return (
    <PopBoxContext.Provider value={{ popBoxType, setPopBoxType, closePopBox }}>
      {children}
    </PopBoxContext.Provider>
  );
};

export { PopBoxContext, PopBoxProvider };
