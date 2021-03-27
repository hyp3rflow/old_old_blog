import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ITemplateProps } from '../interface';
import Utterances from '../components/Utterance';
import styled from 'styled-components';

import '../../node_modules/katex/dist/katex.min.css';
import Seo from '../components/Seo';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  date: string;
  description: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  const { description, title, date, html } = props.pageContext;
  const [isBOJ, setBOJ] = useState(false);
  const [BOJrank, setRank] = useState(0);

  const DisplayRank = props => {
    console.log(props);
    const rank = props.level;

    if (!isBOJ) return <></>;

    const ImgSrc = `https://static.solved.ac/tier_small/${BOJrank}.svg`;

    return (
      <>
        <img src={ImgSrc}></img>
      </>
    );
  };

  useEffect(() => {
    if (title.includes('백준')) {
      const problem = parseInt(title.split('#')[1], 10);

      fetch(`https://api.solved.ac/v2/problems/lookup.json?ids=${problem}`, {
        headers: {
          accept: '*/*',
        },

        body: null,
        method: 'GET',
      })
        .then(response => response.json())
        .then(response => {
          setRank(response.result.problems[0].level);
          setBOJ(true);
        });
    }
  }, []);

  return (
    <>
      <Seo title={title} description={description} />
      <Layout>
        <PostTitle>
          {title} <DisplayRank level={BOJrank} />
        </PostTitle>
        <h4>{date}</h4>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Utterances repo="hyp3rflow/blog" />
      </Layout>
    </>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;

const ProblemRank = styled.div`
  color: hsla(0, 0%, 50%, 1);
  padding-right: 8px;
`;

const PostTitle = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;

  img {
    position: relative;
    top: 2px;
    left: 7px;
    width: 30px;
    height: 30px;
    padding: 1px 6px 0px 0px;
  }
`;
