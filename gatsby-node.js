/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(obj|glb|gltf|)$/,
          use: [`url-loader`],
        },
        {
          test: /\.(bin)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
      ],
    },
  });
};

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: {
            fileAbsolutePath: { regex: "/content/work/" }
            frontmatter: { featured: { eq: true } }
          }
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          nodes {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    `
  );
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // Create pages for each markdown file.
  const workSingleTemplate = path.resolve(`src/templates/work-single.js`);
  const posts = result.data.allMarkdownRemark.nodes;

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.frontmatter.slug,
        component: workSingleTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }
};
