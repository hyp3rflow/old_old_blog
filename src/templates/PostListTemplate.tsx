import React from 'react';
import { IPostListTemplateContext, ITemplateProps } from '../interface';
import PostCategory from '@src/components/PostCategory';
import PostItem, { Post, PostList } from '@src/components/Post';
import Seo from '@src/components/Seo';
import Layout from '@src/components/Layout';

type IPostListTemplateProps = ITemplateProps<IPostListTemplateContext>;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo(props => {
  const { title, pagePath, nodes } = props.pageContext;

  return (
    <Layout>
      <Seo title={title} url={pagePath} />
      <PostCategory />
      <PostList>
        {nodes.map(node => (
          <PostItem
            key={node.id}
            post={node}
            truepath={node.frontmatter.path}
          />
        ))}
      </PostList>
    </Layout>
  );
});

PostListTemplate.displayName = 'PostListTemplate';

export default PostListTemplate;
