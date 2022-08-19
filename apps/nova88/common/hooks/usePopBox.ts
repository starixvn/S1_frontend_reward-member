import { useContext } from "react";
import { PopBoxContext } from "common/components/PopBox/PopBoxContext";
import { PopBoxContextInterface } from "common/components/PopBox/type";

const usePopBox = (): PopBoxContextInterface => {
  return useContext(PopBoxContext);
};

export { usePopBox };
