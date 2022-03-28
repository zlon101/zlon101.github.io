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
    name: 'vue 组件指令',
    path: 'https://zlong1010.github.io/vue-components/#/',
  },
  {
    name: 'Debug',
    path: '/debug',
  },
  {
    name: 'Github',
    path: 'http://github.com',
  },
];

function Header() {
  return (
    <header className="c-header">
      {config.map(item => (
        <Link to={item.path} key={item.name}>
          {item.name}
        </Link>
      ))}
    </header>
  );
}

export default Header;
