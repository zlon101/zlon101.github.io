// MD文件模板
import React from 'react';
import { graphql } from 'gatsby';
import { defineCustomElements } from "@deckdeckgo/highlight-code/dist/loader";
import Layout from '@cmp/layout';
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

const tempDom = document.createElement('div');

const handleScroll = e => {
  const article = document.querySelector('.article-wrap');
  const id = e.target.getAttribute('data-id');
  const title = article.querySelector(`#t-${id}`);
  title && title.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

function Template({ data }) {
  const { markdownRemark: post } = data;
  let html = post.html;
  const titlesHtml = [...html.matchAll(/<h\d>(.+)<\/h\d>/g)];
  const titles = titlesHtml.map(item => {
    tempDom.innerHTML = item[0];
    return tempDom.textContent;
  });
  const N = titlesHtml.length;
  [...titlesHtml].reverse().forEach((item, idx) => {
    html = html.slice(0, item.index + 3) + ` id="t-${N - idx - 1}" ` + html.slice(item.index + 3);
  });
  return (
    <Layout className="page page-article-template">
      <article className='article-wrap' dangerouslySetInnerHTML={{ __html: html }}></article>
      <div className='article-title-wrap'>
        <ul onClick={handleScroll} className='article-title-list'>
          {titles.map((item, idx2) => <li data-id={idx2} key={item}>{item}</li>)}
        </ul>
      </div>
    </Layout>
  );
}

export default Template;
