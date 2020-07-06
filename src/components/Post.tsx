import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import oc from 'open-color'

export interface Post {
    id: string
    excerpt: string
    frontmatter: {
        title: string
        last_modified_at: string
        categories: string[]
        path: string
    }
}

interface Props {
    post: Post
}

const PostItem: React.FC<Props> = ({ post }) => {
    const [color, setColor] = useState('white')

    useEffect(() => {
        switch (post.frontmatter.categories[0]) {
            case 'BOJ':
                setColor('skyblue')
                break

            case 'algorithm':
                setColor('mediumspringgreen')
                break

            case 'ALPS':
                setColor('coral')
                break

            default:
                setColor('brown')
                break
        }
    }, [])

    return (
        <Wrapper color={color}>
            <LinkWrap>{post.frontmatter.path}</LinkWrap>
            <PostWrapper to={post.frontmatter.path}>
                <PostTop>
                    <PostTitle>{post.frontmatter.title}</PostTitle>
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
    )
}

export default PostItem

const LinkWrap = styled.div`
    color: hsla(0, 0%, 50%, 1);
`

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
        left: 2px;
        top: 2px;
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: black;
        z-index: -1;
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
`

const PostWrapper = styled(Link)`
    text-decoration: none;
`

const PostTop = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    flex-wrap: wrap;
`

const PostTitle = styled.h2`
    margin-right: 8px;
    word-break: keep-all;
    overflow-wrap: break-word;
`

const PublishedDate = styled.small``

const Description = styled.div`
    word-break: keep-all;
    overflow-wrap: break-word;
`

const TagList = styled.ul`
    display: flex;
    align-items: center;
    margin-top: 12px;
    flex-wrap: wrap;
`

const Tag = styled.li`
    list-style-type: none;
    font-size: 0.75em;
    display: block;
    margin-bottom: 4px;
    &:not(:last-child) {
        margin-right: 0.5em;
    }
`

export const PostList = styled.ol`
    margin: 0 -24px;
    @media screen and (max-width: 800px) {
        margin: 0 -12px;
    }
`
