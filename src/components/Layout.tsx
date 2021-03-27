import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

import './style.scss';
import 'prismjs/themes/prism-tomorrow.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 24px;
`;

const Content = styled.div`
  margin-top: 60px;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
