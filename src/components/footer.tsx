import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <Wrapper>
            <a href="https://github.com/hyp3rflow/">hyp3rflow@github</a>
            <a href="https://github.com/hyp3rflow/blog">blog@repository</a>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    margin-top: 20px;
    height: 50px;
    border-top: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default Footer
