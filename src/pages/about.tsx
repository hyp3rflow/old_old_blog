import { graphql, useStaticQuery, Link } from 'gatsby';
import React from 'react';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import TextLoop from 'react-text-loop';
import styled from 'styled-components';
import oc from 'open-color';

const texts = [
  '프론트엔드 개발자 🚀',
  'UI / UX 디자이너 🧐',
  '알고리즘을 좋아하는 🧑🏻‍💻',
];

const Resume: React.FC = () => {
  return (
    <Layout>
      <Seo title="About" url="/about" />
      <Introduction>
        <IntroNested>
          안녕하세요?
          <br />
          저는&nbsp;
          <TextLoop
            interval={2000}
            children={texts}
            springConfig={{ stiffness: 100, damping: 10 }}
          />
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
        <br />
        per aspera, ad astra.
      </ResumeContext>
      <Linespace />
      <ResumeTitle>알고리즘과 웹을 좋아합니다.</ResumeTitle>
      <ResumeContext>
        고려대학교 알고리즘 학회 ALPS에서 회장을 맡고 있습니다. (2020.08~)
        <br />
        요즘은 웹에 관심이 많아 리액트를 공부하면서 프론트엔드의 길을 가고
        있습니다.
        <br />
        컴퓨터학과 개발팀 ALT_TAB을 구성하여 활동중이며,
        <br />
        <ul style={{ paddingBottom: '10px' }}>
          <li>
            <a href="https://github.com/ku-kosmos/anam_food" target="_blank">
              안암 뭐 먹지? (WebApp w/ React.js)
            </a>
          </li>
          <li>
            <a href="https://github.com/ku-kosmos/my_recipe" target="_blank">
              나만의 레시피 (Cross-platform App w/ React-native)
            </a>
          </li>
          <li>
            <a
              href="https://github.com/KU-KUICS/KUICS_frontend"
              target="_blank"
            >
              정보보호학회 KUICS 홈페이지 개편 (w/ React.js)
            </a>
          </li>
        </ul>
        와 같은 여러 프로젝트를 진행하고 있습니다.
      </ResumeContext>
      <Linespace />
      <ResumeTitle>이것저것 만드는 것도 좋아합니다.</ResumeTitle>
      <ResumeContext>
        C++과 강화학습에 관심이 있어 관련된 프로젝트를 진행하고 있습니다.
        <br />
        오픈소스 프로젝트를 진행하면서 프로젝트 문화를 익히고,
        <br />
        오픈소스 문화에 동참하여 많은 사람과 함께 변화를 이끄는 사람이 되고
        싶습니다.
        <p style={{ paddingTop: '10px' }}>
          주위의 고마우신 여러 팀원분들과 함께,
          <br />
          <ul style={{ paddingBottom: '10px' }}>
            <li>
              <a href="https://github.com/hyp3rflow/hyperGuess" target="_blank">
                hyperGuess - 숫자 맞추기 게임 강화학습
              </a>
            </li>
            <li>
              <a
                href="https://github.com/utilForever/HellSolver"
                target="_blank"
              >
                HellSolver - Helltaker 게임 강화학습
              </a>
            </li>
            <li>
              <a
                href="https://github.com/utilForever/polybridgepp"
                target="_blank"
              >
                Polybridgepp - Poly Bridge 게임 강화학습
              </a>
            </li>
            <li>
              <a href="https://github.com/utilForever/Polisher" target="_blank">
                Polisher - Cross-Platform 게임 엔진 (w/ Rust)
              </a>
            </li>
          </ul>
          와 같은 여러 프로젝트를 진행하고자 공부하고 있습니다.
        </p>
      </ResumeContext>
      <Linespace />
      <ResumeTitle>심플하고 아름다운 것을 좋아합니다.</ResumeTitle>
      <ResumeContext>
        어려서부터 컴퓨터로 시각디자인 작업을 하는 것을 좋아했기에
        <br />
        Photoshop, Illustrator, Figma과 같은 디자인 툴과 친합니다.
        <br />
        기술을 통한 구현만큼 유저와의 편리한 상호작용도 중요하다고 생각합니다.
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
  );
};

const Hi = styled.div`
  position: relative;
  display: inline-block;
`;

const Introduction = styled.div`
  position: relative;
  line-height: 1.5;
`;

const IntroNested = styled.h1`
  font-weight: 800;
`;

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
`;

const Hyperflow = styled.div`
  position: relative;
  display: inline-block;
  color: white;
  -webkit-font-smoothing: antialiased;
  font-style: italic;
`;

const Linespace = styled.div`
  padding: 20px;
`;

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
`;

const ResumeContext = styled.p`
  font-size: 20px;
  padding-top: 10px;
  word-break: keep-all;
  line-height: 160%;
`;

Resume.displayName = 'resume';

export default Resume;
