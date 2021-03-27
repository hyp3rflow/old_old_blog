import React from 'react';

import PostCategory from '@src/components/PostCategory';
import PostItem, { Post, PostList } from '@src/components/Post';
import Seo from '@src/components/Seo';
import Layout from '@src/components/Layout';

import { IPostListTemplateContext, ITemplateProps } from '../interface';

type IPostListTemplateProps = ITemplateProps<IPostListTemplateContext>;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo(props => {
  const { title, nodes } = props.pageContext;

  return (
    <Layout>
      <Seo title={title} />
      <PostCategory />
      <PostList>
        {nodes.map(node => (
          <PostItem key={node.id} post={node as Post} />
        ))}
      </PostList>
    </Layout>
  );
});

export default PostListTemplate;
