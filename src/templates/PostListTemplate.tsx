import React from 'react'
import { IPostListTemplateContext, ITemplateProps } from '../interface'
import PostCategory from '../components/PostCategory'
import PostItem, { Post, PostList } from '../components/Post'
import SEO from '../components/seo'
import Layout from '../components/layout'

type IPostListTemplateProps = ITemplateProps<IPostListTemplateContext>

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo(props => {
    const { title, pagePath, nodes } = props.pageContext

    return (
        <Layout>
            <SEO title={title} url={pagePath} />
            <PostCategory />
            <PostList>
                {nodes.map(node => (
                    <PostItem key={node.id} post={node} truepath={node.frontmatter.path} />
                ))}
            </PostList>
        </Layout>
    )
})

PostListTemplate.displayName = 'PostListTemplate'

export default PostListTemplate
