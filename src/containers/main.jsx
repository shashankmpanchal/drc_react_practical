import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar";

const MainContainer = () => {
  return (
    <>
      <NavbarComponent />
      <div className="mt-6 px-6">
        <Outlet />
      </div>
    </>
  );
};

export default MainContainer;
