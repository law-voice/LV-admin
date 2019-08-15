import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import style from './index.less';

const Layout = ({ children }) => (
  <PageHeaderWrapper className={style.header}>
    <div className="page">{children}</div>
  </PageHeaderWrapper>
);

export default Layout;
