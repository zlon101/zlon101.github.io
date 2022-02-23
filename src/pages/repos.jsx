import React from 'react';
import { Link } from 'gatsby';
import Layout from '@cmp/layout';
import { createCls } from '@/util';

const prefix = createCls('p-repos');

const nav = <Link to='/'>vue组件</Link>;

const Repos = () => (
  <Layout nav={nav} className={`page ${prefix('wrap')}`}>
    <iframe src="https://zlong1010.github.io/vue-components/#/" width="100%" height="900"></iframe>
  </Layout>
);

export default Repos;