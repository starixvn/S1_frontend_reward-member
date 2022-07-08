import React from 'react';
import Header from "../header/header";
import PopBox from "../popups/popBox";

const Layout = ({ children}) => {
  return (
    <>
      <Header />
      <PopBox />
      {children}
    </>
  );
};

export default Layout;
