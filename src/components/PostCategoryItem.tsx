import React, { memo } from 'react'
import startCase from 'lodash.startcase'
import { Link } from 'gatsby'

interface IPostCategoryItemProps {
    name: string
    count: number
    link: string
}

const PostCategoryItem: React.FC<IPostCategoryItemProps> = memo(({ count, link, name }) => (
    <li>
        <Link to={link}>
            {startCase(name)} ({count})
        </Link>
    </li>
))

PostCategoryItem.displayName = 'PostCategoryItem'

export default PostCategoryItem
