import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/layout'
import TextLoop from 'react-text-loop'
import styled from 'styled-components'

const texts = ['뉴비 프론트엔드 개발자 🚀', 'UI/UX 디자이너 🧐', '알고리즘을 배우는 🧑🏻‍💻', '사이버 노가다꾼 👷🏼‍♂️']

const Resume: React.FC = () => {
    return (
        <Layout>
            <SEO title="About" url="/about" />
            <h1>
                Say Hi to the Internet!
                <br />
                저는&nbsp;
                <TextLoop interval={2000} children={texts} springConfig={{ stiffness: 100, damping: 10 }} />
                <br />
                hyperflow 입니다.
            </h1>
            <Linespace />
            <ResumeTitle>최용욱</ResumeTitle>
            <ResumeContext>
                고려대학교 컴퓨터학과 학부과정
                <br />
                알고리즘에 관심이 많고, 프론트엔드를 공부하고 있습니다.
            </ResumeContext>
            <Linespace />
            <ResumeTitle>관심사</ResumeTitle>
            <ResumeContext>
                고려대학교 알고리즘 학회 ALPS에서 부회장을 맡고 있습니다.
                <br />
                요즘은 웹에 관심이 많아 리액트를 공부하면서 프론트엔드의 덕을 쌓고 있습니다.
            </ResumeContext>
            <Linespace />
            <ResumeTitle>잡기술이 좀 있습니다.</ResumeTitle>
            <ResumeContext>
                어려서부터 컴퓨터로 시각디자인 작업을 하는 것을 좋아했기에
                <br />
                Photoshop, Illustrator, Figma, Final Cut과 같은 디자인 툴과 친합니다.
                <br />
                기술을 통한 완벽한 구현만큼 유저와의 상호작용도 중요하다고 생각합니다.
            </ResumeContext>
            <Linespace />
            <ResumeTitle>늦깎이라면 늦깎이입니다.</ResumeTitle>
            <ResumeContext>
                코딩에 문외한인 저는 대학에 와서야 중괄호를 열기 시작했습니다.
                <br />
                그러나 제 아이디어를 구현하기 위해서는 어떠한 러닝커브도 극복할 수 있습니다.
            </ResumeContext>
        </Layout>
    )
}

const Linespace = styled.div`
    padding: 30px;
`

const ResumeTitle = styled.h2`
    position: relative;
`

const ResumeContext = styled.p`
    font-size: 20px;
    padding-top: 10px;
`

Resume.displayName = 'resume'

export default Resume
