import React from 'react';
import startCase from 'lodash.startcase';
import { Link } from 'gatsby';

interface IPostCategoryItemProps {
  name: string;
  count: number;
  link: string;
}

const PostCategoryItem: React.FC<IPostCategoryItemProps> = ({
  count,
  link,
  name,
}) => (
  <li>
    <Link to={link}>
      {startCase(name)} ({count})
    </Link>
  </li>
);

export default PostCategoryItem;
