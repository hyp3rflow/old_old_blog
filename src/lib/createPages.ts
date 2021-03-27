import { CreatePagesArgs } from 'gatsby';
import path from 'path';
import startCase from 'lodash.startcase';

import { MarkdownRemarkConnection } from '../graphql-types';
import { IPostListTemplateContext } from '../interface';

export const createPages = async ({
  actions,
  graphql,
}: CreatePagesArgs): Promise<void> => {
  const { createPage } = actions;

  type Query2 = {
    allMarkdownRemark: MarkdownRemarkConnection;
    allPostByCategory: MarkdownRemarkConnection;
  };

  const { data, errors } = await graphql<Query2>(`
    {
      allPostByCategory: allMarkdownRemark(
        sort: { order: DESC, fields: frontmatter___last_modified_at }
      ) {
        group(field: frontmatter___categories) {
          fieldValue
          nodes {
            id
            frontmatter {
              title
              categories
              path
              last_modified_at(formatString: "YYYY-MM-DD")
            }
            excerpt(truncate: true, pruneLength: 200)
          }
        }
      }

      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              title
              path
              categories
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      context: {
        html: node.html,
        title: node.frontmatter.title,
      },
      component: path.resolve(__dirname, '../templates/PostTemplate.tsx'),
    });
  });

  data.allPostByCategory.group.forEach(({ fieldValue, nodes }) => {
    const pagePath = `/category/${fieldValue}`;
    const title = startCase(fieldValue);

    createPage<IPostListTemplateContext>({
      path: pagePath,
      context: {
        title,
        pagePath,
        categories: fieldValue,
        nodes,
      },
      component: path.resolve(__dirname, '../templates/PostListTemplate.tsx'),
    });
  });
};
