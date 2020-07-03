import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Header from './header'
import Footer from './footer'

import './style.scss'
require('prismjs/themes/prism-tomorrow.css')

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 820px;
    margin: 0 auto;
    padding: 24px;
`

const Content = styled.div`
    margin-top: 80px;
`

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
