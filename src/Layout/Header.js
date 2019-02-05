import React from "react";
//import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Desafio BitX Front-end</Navbar.Brand>
      <Navbar.Toggle />
    </Navbar>
  );
};

export default Navigation;
