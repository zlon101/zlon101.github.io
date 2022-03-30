import React from 'react';
import Header from '@cmp/header';
import Nav from '@cmp/nav';
import { isBrowser, createCls, iconfont } from '@/util';
import './index.less';

isBrowser() && iconfont(window);

const prefix = createCls('c-layout');

const Layout = props => {
  return (
    <div className={`${prefix('wrap')} ${props.className}`}>
      <Header />
      <div className={prefix('sidebar-content')}>
        <div className={prefix('nav')}><Nav>{props.nav}</Nav></div>
        {props.children}
        {/* <main className={prefix('content')}>{props.children}</main> */}
      </div>
    </div>
  );
};

export default Layout;
