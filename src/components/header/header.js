import React from 'react';
import { Link } from 'gatsby';
import './index.less';

const config = [
  {
    name: '首页',
    path: '/',
  },
  {
    name: '博客',
    path: '/',
  },
  {
    name: 'vue组件库',
    path: 'https://zlon101.github.io/npm-lib/#/',
  },
  {
    name: 'Debug',
    path: '/debug/',
  },
  {
    name: 'Github',
    path: 'https://github.com/zlon101',
  },
];

function Header() {
  const list = config.map((item, idx) => {
    if (item.path.includes('://')) {
      return item.name === 'Github' ? (
        <a key={idx} href={item.path} target="_blank" rel="noreferrer noopener">
          <svg
            className="icon-font"
            width="24px"
            height="24px"
            aria-hidden="true"><use href="#icon-font-github1"></use>
          </svg>
        </a>
      ) : (
        <a href={item.path} target="_blank" rel="noreferrer noopener" key={idx}>{item.name}</a>
      );
    }
    return <Link to={item.path} key={idx}>{item.name}</Link>;
  });
  return <header className="c-header">{list}</header>;
}

export default Header;
