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
  return (
    <header className="c-header">
      {config.map(item => (
        <Link to={item.path} key={item.name}>
          {item.name === 'Github' ? (
            <svg className="icon-font" width="24px" height="24px" aria-hidden="true">
              <use href="#icon-font-github1"></use>
            </svg>
          ) : (
            item.name
          )}
        </Link>
      ))}
    </header>
  );
}

export default Header;
