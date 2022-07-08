import React, { useContext } from 'react';
import { popBoxContext } from "../common/Wrapper";
import PopBoxLogin from "./popBox.login";

const PopBox = () => {
  const { popBox } = useContext(popBoxContext);
  let { content } = popBox;
  switch (popBox.popBoxType) {
    case "login":
      content = (
        <PopBoxLogin />
      )
      break
    case "error":
      content = (
       "errorContent"
      )
      break
    default :
      break
  }
  return(
    <>

    </>
  )
};

export default PopBox;
