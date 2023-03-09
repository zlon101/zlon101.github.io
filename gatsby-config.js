/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'zlong blog',
  },
  plugins: [
    // 处理文章中的图像
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files', // 在md文件中使用svg图像
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
            },
          },
          // 高亮代码块
          {
            resolve: 'gatsby-remark-highlight-code',
            options: {
              terminal: 'carbon',
              theme: 'blackboard',
            },
          },
        ],
      },
    },
    // "gatsby-plugin-react-helmet",
    // 添加以下两个插件，一个用于读取md文件，一个用于转换其为html
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/static`,
      },
    },
    'gatsby-plugin-less',
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@': 'src',
          '@style': 'src/style',
          '@cmp': 'src/components',
        },
        extensions: ['js', 'jsx', 'tsx'],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
};
