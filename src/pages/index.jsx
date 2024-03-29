// 主页
import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '@cmp/layout';
import { DateUtil, createCls } from '@/util';
import '@style/global.less';
import '@style/home.less';

const prefix = createCls('page-home');

const HomePage = ({ data }) => {
  let articles = data.allMarkdownRemark.nodes;
  articles = articles.sort((a, b) =>
    DateUtil.sort(a.parent.mtime, b.parent.mtime, 'desc')
  );
  return (
    <Layout className={`page ${prefix('wrap')}`}>
      <div style={{padding: '16px 24px 0'}}>
        <h2 style={{marginBottom:'24px'}}>最近修改</h2>
        {articles.map(node => (
          <section className={prefix('excerpt')} key={node.id}>
            <div className={prefix('excerpt-header')}>
              <Link
                className={prefix('excerpt-header-title')}
                to={node.fields.articlePath}
              >
                {node.parent.name}
              </Link>
              {/* <span className={prefix('excerpt-header-desc')}>
                {DateUtil.dataToLocaleString(node.parent.mtime)}
              </span> */}
            </div>
            {/* dangerouslySetInnerHTML={{__html: node.excerpt}} */}
            <p className={prefix('excerpt-text')}>{node.excerpt}</p>
          </section>
        ))}
      </div>
    </Layout>
  );
};
/**
 * 使用graphql读取目录下的文件,传递给HomePage的data参数
 * filter: { frontmatter: { hide: { eq: false } } }
 */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 20
      filter: { frontmatter: { hide: { ne: true } } }
    ) {
      nodes {
        id
        fields {
          articlePath
        }
        excerpt(format: PLAIN)
        parent {
          ... on File {
            name
            mtime(formatString: "YYYY/MM/DD hh:mm")
          }
        }
      }
    }
  }
`;

export default HomePage;
