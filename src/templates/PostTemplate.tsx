import React from 'react'
import Layout from '../components/layout'
import { ITemplateProps } from '../interface'
import Utterances from '../components/utterance'

import '../../node_modules/katex/dist/katex.min.css'
import SEO from '../components/seo'

type IPostTemplateProps = ITemplateProps<{
    html: string
    title: string
    date: string
    description: string
}>

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
    const { description, title, date, html } = props.pageContext
    return (
        <>
            <SEO title={title} description={description} />
            <Layout>
                <h2>{title}</h2>
                <h4>{date}</h4>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: html }} />
                <Utterances repo="hyp3rflow/blog" />
            </Layout>
        </>
    )
})

PostTemplate.displayName = 'PostTemplate'

export default PostTemplate
