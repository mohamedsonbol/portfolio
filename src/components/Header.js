import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
`;

const NavLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  margin: 0 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <Nav>
      <h1 style={{ color: 'white' }}>Mohamed Sonbol</h1>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/resume">About me</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>

      </div>
    </Nav>
  );
};

export default Header;
