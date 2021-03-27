import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

export interface Post {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
    last_modified_at: string;
    categories: string[];
    path: string;
  };
}

interface Props {
  post: Post;
}

const RankDivision = [
  'Unknown',
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond',
  'Ruby',
];

const Division = level => {
  if (level === 0) return RankDivision[0];
  else {
    level -= 1;
    return (
      RankDivision[Math.floor(level / 5) + 1] +
      ' ' +
      (5 - (level % 5)).toString()
    );
  }
};

const PostItem: React.FC<Props> = ({ post }) => {
  const [color, setColor] = useState('white');

  const [isBOJ, setBOJ] = useState(false);
  const [BOJRank, setRank] = useState(0);

  useEffect(() => {
    if (post.frontmatter.title.includes('백준')) {
      const problem = parseInt(post.frontmatter.path.split('/')[2], 10);

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

    switch (post.frontmatter.categories[0]) {
      case 'BOJ':
        setColor('skyblue');
        break;

      case 'algorithm':
        setColor('mediumspringgreen');
        break;

      case 'ALPS':
        setColor('coral');
        break;

      case 'ML':
        setColor('palevioletred');
        break;

      default:
        setColor('brown');
        break;
    }
  }, []);

  const DisplayRank = props => {
    // console.log(props)
    const rank = props.level;

    if (!isBOJ) return <></>;

    const ImgSrc = `https://static.solved.ac/tier_small/${BOJRank}.svg`;

    return (
      <>
        <img src={ImgSrc}></img>
        <ProblemRank>{Division(rank)}</ProblemRank>
      </>
    );
  };

  return (
    <Wrapper color={color}>
      <LinkWrap>{post.frontmatter.path}</LinkWrap>
      <PostWrapper to={post.frontmatter.path}>
        <PostTop>
          <PostTitle>{post.frontmatter.title}</PostTitle>
          <DisplayRank level={BOJRank} />
          <PublishedDate>{post.frontmatter.last_modified_at}</PublishedDate>
        </PostTop>
        <Description>{post.excerpt}</Description>
        <TagList>
          {post.frontmatter.categories.map(cat => (
            <Tag key={cat}>{`#${cat}`}</Tag>
          ))}
        </TagList>
      </PostWrapper>
    </Wrapper>
  );
};

export default PostItem;

const ProblemRank = styled.div`
  color: hsla(0, 0%, 50%, 1);
  padding-right: 8px;
`;

const LinkWrap = styled.div`
  color: hsla(0, 0%, 50%, 1);
`;

const Wrapper = styled.li`
  &:before {
    width: 10px;
    height: 20px;
    background-color: ${props => props.color};
    position: absolute;
    left: 0px;
    top: 17px;
    transform: skew(0, 20deg);
    content: '';
    z-index: -1;
  }
  &:after {
    left: 0px;
    top: 100%;
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: black;
    content: '';
    z-index: 3;
  }
  padding: 20px 24px;
  list-style-type: none;
  transition: background-color 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  border-radius: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  &:nth-child(n + 2) {
    margin-top: 12px;
  }
  @media screen and (max-width: 800px) {
    padding: 12px;
  }

  position: relative;
`;

const PostWrapper = styled(Link)`
  text-decoration: none;
`;

const PostTop = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  img {
    position: relative;
    top: 2px;
    left: -1px;
    width: 30px;
    height: 30px;
    padding: 1px 6px 0px 0px;
    margin-right: 1px;
  }
`;

const PostTitle = styled.h2`
  margin-right: 8px;
  word-break: keep-all;
  overflow-wrap: break-word;
  padding-bottom: 5px;
  padding-top: 0px;
`;

const PublishedDate = styled.small``;

const Description = styled.div`
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const TagList = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const Tag = styled.li`
  list-style-type: none;
  font-size: 0.75em;
  display: block;
  margin-bottom: 4px;
  &:not(:last-child) {
    margin-right: 0.5em;
  }
`;

export const PostList = styled.ol`
  margin: 0 -24px;
  @media screen and (max-width: 800px) {
    margin: 0 -12px;
  }
`;
