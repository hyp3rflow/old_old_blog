import { graphql, useStaticQuery, Link } from 'gatsby'
import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/layout'
import TextLoop from 'react-text-loop'
import styled from 'styled-components'
import oc from 'open-color'

const texts = ['프론트엔드 개발자 🚀', 'UI / UX 디자이너 🧐', '알고리즘을 좋아하는 🧑🏻‍💻']

const Resume: React.FC = () => {
    return (
        <Layout>
            <SEO title="About" url="/about" />
            <Introduction>
                <IntroNested>
                    안녕하세요?
                    <br />
                    저는&nbsp;
                    <TextLoop interval={2000} children={texts} springConfig={{ stiffness: 100, damping: 10 }} />
                    <br />
                    <Hi>
                        <Background />
                        <Hyperflow>hyperflow</Hyperflow>
                    </Hi>
                    &nbsp;입니다.
                </IntroNested>
            </Introduction>
            <Linespace />
            <ResumeTitle primary>최용욱</ResumeTitle>
            <ResumeContext>
                진주고등학교 졸업
                <br />
                고려대학교 컴퓨터학과 학부과정 (2019 ~)
                <br />
                프로그래밍으로 세상을 바꿀 수 있다고 믿습니다.
            </ResumeContext>
            <Linespace />
            <ResumeTitle>알고리즘과 웹을 좋아합니다.</ResumeTitle>
            <ResumeContext>
                고려대학교 알고리즘 학회 ALPS에서 부회장을 맡고 있습니다.
                <br />
                요즘은 웹에 관심이 많아 리액트를 공부하면서 프론트엔드의 덕을 쌓고 있습니다.
                <br />
                컴퓨터학과 개발팀 ALT_TAB을 구성하여 동료들과 함께 공부하고 있습니다.
            </ResumeContext>
            <Linespace />
            <ResumeTitle>심플하고 아름다운 것을 좋아합니다.</ResumeTitle>
            <ResumeContext>
                어려서부터 컴퓨터로 시각디자인 작업을 하는 것을 좋아했기에
                <br />
                Photoshop, Illustrator, Figma, Final Cut과 같은 디자인 툴과 친합니다.
                <br />
                기술을 통한 완벽한 구현만큼 유저와의 편리한 상호작용도 중요하다고 생각합니다.
                <br />
                현재는 모든 사람에게 접근성 있는 키오스크 인터페이스에 대해서 고민하고 있습니다.
            </ResumeContext>
            <Linespace />
            <ResumeTitle>제 사서함은 이곳입니다.</ResumeTitle>
            <ResumeContext>
                <a href="mailto:hyperflow@kakao.com" target="_blank">
                    hyperflow@kakao.com
                </a>
                <br />
                편하게 연락주세요, 읽어주셔서 감사합니다.
            </ResumeContext>
        </Layout>
    )
}

const Hi = styled.div`
    position: relative;
    display: inline-block;
`

const Introduction = styled.div`
    position: relative;
    line-height: 1.5;
`

const IntroNested = styled.h1`
    font-weight: 800;
`

const Background = styled.div`
    position: absolute;
    left: -0.3em;
    right: 0;
    top: 0;
    bottom: 0;
    width: 5.95em;
    background: black;
    transform: skew(-5deg, 0);
    -webkit-backface-visibility: hidden;
`

const Hyperflow = styled.div`
    position: relative;
    display: inline-block;
    color: white;
    -webkit-font-smoothing: antialiased;
    font-style: italic;
`

const Linespace = styled.div`
    padding: 30px;
`

const ResumeTitle = styled.h2`
    &:before {
        width: 10px;
        height: 20px;
        background-color: ${props => (props.primary ? 'coral' : 'skyblue')};
        position: absolute;
        left: -20px;
        top: -5px;
        transform: skew(0, 20deg);
        content: '';
        z-index: -1;
    }

    &:nth-child(n + 2) {
        padding-top: 0px;
    }

    position: relative;
`

const ResumeContext = styled.p`
    font-size: 20px;
    padding-top: 10px;
    word-break: keep-all;
    line-height: 160%;
`

Resume.displayName = 'resume'

export default Resume
