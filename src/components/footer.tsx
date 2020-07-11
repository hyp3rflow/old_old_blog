import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <>
            <Wrapper>
                <a href="https://github.com/hyp3rflow/">hyp3rflow@github</a>
                <a href="https://github.com/hyp3rflow/blog">blog@repository</a>
            </Wrapper>
            <Powered>
                powered by GatsbyJS, BOJ Rating by <a href="https://solved.ac">solved.ac</a>
            </Powered>
        </>
    )
}

const Wrapper = styled.footer`
    margin-top: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Powered = styled.footer`
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
`

export default Footer
