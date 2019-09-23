import React, { Component } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class Header extends Component {
  render () {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Главная</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/registration/">
            <Nav.Link>Регистрация</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/presentations/">
            <Nav.Link>Презентации</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
