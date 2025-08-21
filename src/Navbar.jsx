import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './App.css'

const CineflixNavbar = () => {
  return (
    <Navbar expand="lg" className="cineflix-navbar">
      <Container>
        <Navbar.Brand href="/" className="brand-logo">
           CINEFLIX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/movies">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CineflixNavbar;
