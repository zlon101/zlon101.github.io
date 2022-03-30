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
    name: 'vue组件指令',
    path: 'https://zlong1010.github.io/vue-components/#/',
  },
  {
    name: 'Debug',
    path: '/debug',
  },
  {
    name: 'Github',
    path: 'https://github.com/zlong1010',
  },
];

function Header() {
  const list = config.map((item, idx) => {
    if (item.path.includes('://')) {
      return item.name === 'Github' ? (
        <a key={idx} href={item.path} _blank="_blank" rel="noreferrer noopener">
          <svg
            className="icon-font"
            width="24px"
            height="24px"
            aria-hidden="true"><use href="#icon-font-github1"></use>
          </svg>
        </a>
      ) : (
        <a key={idx} to={item.path}>{item.name}</a>
      );
    }
    return <Link key={idx} to={item.path}>{item.name}</Link>;
  });
  return <header className="c-header">{list}</header>;
}

export default Header;
