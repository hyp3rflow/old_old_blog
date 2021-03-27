import React from 'react';
import { IPostListTemplateContext, ITemplateProps } from '../interface';
import PostCategory from '../components/PostCategory';
import PostItem, { Post, PostList } from '../components/Post';
import Seo from '../components/Seo';
import Layout from '../components/Layout';

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
