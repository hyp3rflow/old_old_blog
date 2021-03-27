import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from '@src/components/Layout';
import Seo from '@src/components/Seo';
import Utterances from '@src/components/Utterance';

import '../../node_modules/katex/dist/katex.min.css';
import { ITemplateProps } from '../interface';

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

  const DisplayRank = ({ rank }: { rank: number }) => {
    if (!isBOJ) return <></>;

    const ImgSrc = `https://static.solved.ac/tier_small/${rank}.svg`;

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
          {title} <DisplayRank rank={BOJrank} />
        </PostTitle>
        <h4>{date}</h4>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Utterances repo="hyp3rflow/blog" />
      </Layout>
    </>
  );
});

export default PostTemplate;
