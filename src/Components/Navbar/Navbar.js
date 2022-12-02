import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logout from "../Logout/Logout";
import Nav from "react-bootstrap/Nav";
import styles from "../Login/Login.module.css";
import { Link } from "react-router-dom";

import React from "react";

export const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Cliff.ai</Navbar.Brand>
          <Nav>
            <Link to="/dashboard" >
              <button className={styles.green_btn}> Dashboard</button>
            </Link>
            <Link to="/subscriptions" >
              <button className={styles.green_btn}> Subscriptions</button>
            </Link>
          </Nav>
          <Nav className="justify-content-end">
            <Logout />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
