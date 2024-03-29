/*
 * 用GraphQL取得所有的文章，用 foreach 针对每一篇文章使用 createPage 建立新页面，这里则需要用到 path 和 postTemplate
 * Each export found in this file will be parsed by Gatsby
 */
const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

// 向数据源结点中添加自定义数据, 作为URL中的路径, 注意 basePath: 'pages'
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type !== `MarkdownRemark`) return;

  /* const fileNode = getNode(node.parent);
  console.log(`\nrelativePath:`, fileNode.relativePath); */
  const articlePath = createFilePath({ node, getNode }); // basePath: 'pages'
  // static
  // console.log('\n文章:', articlePath);
  actions.createNodeField({
    node,
    name: 'articlePath',
    value: articlePath,
  });
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/post.js');
  return graphql(`
    {
      allMarkdownRemark {
        nodes {
          fields {
            articlePath
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors);
    }
    res.data.allMarkdownRemark.nodes.forEach(node => {
      createPage({
        path: node.fields.articlePath,
        component: postTemplate,
        context: { articlePath: node.fields.articlePath }, // context 会传递给组件的 props.pageContext 用于 query variables
      });
    });
  });
};
