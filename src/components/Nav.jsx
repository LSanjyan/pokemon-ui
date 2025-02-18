import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Nav = () => {
    return (
        <Navbar expand="lg" className="bg-secondary">
        <Container>
          <Navbar.Brand className="text-light fw-bold">Pokeverse | </Navbar.Brand>
          <Navbar.Brand className="text-light text-start">All Pokemon</Navbar.Brand>
        </Container>
      </Navbar>
    );
};

export default Nav;