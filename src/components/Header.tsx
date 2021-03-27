import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.nav`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 42px;
  height: 60px;
  background-color: hsla(0, 0%, 100%, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    padding: 0 24px;
  }

  border-bottom: 1px solid black;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 1.25rem;
  &:active,
  &:focus {
    color: initial;
  }
  &.nav-active:hover {
    color: initial;
  }
  font-weight: 500;
`;

const Header: React.FC = () => (
  <Wrapper>
    <NavItem to="/" style={{ fontWeight: '800' }} activeClassName="nav-active">
      hyp3rflow
    </NavItem>
    <NavItem to="/about" activeClassName="nav-active">
      about
    </NavItem>
  </Wrapper>
);

export default Header;
