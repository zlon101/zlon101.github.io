// MD文件模板
import React from 'react';
import { graphql } from 'gatsby';
import { defineCustomElements } from '@deckdeckgo/highlight-code/dist/loader';
import Layout from '@cmp/layout';
import { isBrowser } from '@/util';
import '@style/global.less';
import './article.less';
// import Helmet from "react-helmet";

defineCustomElements();

// In Gatsby, query variables can only be used inside of page queries. (You can’t use them with the useStaticQuery hook.)
// $articlePath 的值来源于 createPage 中的 context
export const postQuery = graphql`
  query BlogPostByPath($articlePath: String) {
    markdownRemark(fields: { articlePath: { eq: $articlePath } }) {
      fields {
        articlePath
      }
      html
      id
      parent {
        ... on File {
          name
          base
          mtime
          sourceInstanceName
        }
      }
    }
  }
`;

const handleScroll = e => {
  if (!isBrowser()) return;
  const article = document.querySelector('.article-wrap');
  const id = e.target.getAttribute('data-id');
  const title = article.querySelector(`#t-${id}`);
  title && title.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

const tempDom = isBrowser() ? document.createElement('div') : {};
function Template({ data }) {
  const { markdownRemark: post } = data;
  let mdHtml = post.html;
  const titlesHtml = [...mdHtml.matchAll(/<h\d>(.+)<\/h\d>/g)];
  // console.log('\ntitlesHtml:\n', titlesHtml);
  const titles = titlesHtml.map(item => {
    return item[0];
    // tempDom.innerHTML = item[0];
    // return tempDom.textContent;
  });
  const N = titlesHtml.length;
  [...titlesHtml].reverse().forEach((item, idx) => {
    mdHtml = mdHtml.slice(0, item.index + 3) + ` id="t-${N - idx - 1}" ` + mdHtml.slice(item.index + 3);
  });
  return (
    <Layout className="page page-article-template">
      <article className="article-wrap" dangerouslySetInnerHTML={{ __html: mdHtml }}></article>
      <div className="article-title-wrap">
        <Title titles={titles} />
      </div>
    </Layout>
  );
}

function Title({ titles }) {
  const items = titles.map((htmlItem, idx) => htmlItem.slice(0, 3) + ` data-id="${idx}" class="item"` + htmlItem.slice(3));
  const innerHtml = items.join('');
  return (
    <div onClick={handleScroll} className="article-title-list" dangerouslySetInnerHTML={{ __html: innerHtml }}></div>
  );
}

export default Template;
