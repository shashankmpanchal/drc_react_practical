import { Button, Navbar } from "flowbite-react";
import React from "react";
import reactLogo from "../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const {
    store: { auth },
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout(callback) {
    dispatch({ type: "LOGOUT" });
    callback();
  }
  return (
    <Navbar className="bg-zinc-950 rounded-none" fluid>
      <Navbar.Brand href="/dashboard">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src={reactLogo}
        />
      </Navbar.Brand>
      <div className="flex items-center gap-2 md:order-2">
        <p className="text-white">
          <span className="text-xs">Welcome,</span> {auth?.name ?? ""}
        </p>
        <Button
          size="sm"
          className="bg-red-800 rounded-md text-white hover:bg-red-700"
          onClick={() => {
            logout(() => navigate("/"));
          }}
        >
          Logout
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="text-white">
        <Link className="hover:text-gray" to="/dashboard">
          <p>Dashboard</p>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
