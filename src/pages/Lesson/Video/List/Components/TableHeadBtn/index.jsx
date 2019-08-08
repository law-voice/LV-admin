import React, { PureComponent } from 'react';
import { Button } from 'antd';
import styles from './index.less';

class Index extends PureComponent {
  render() {
    let { onAddBtn, onChangeBtn, onDelBtn } = this.props;
    return (
      <div className={styles.btnBox}>
        <Button className={styles.btn} type="primary" onClick={onAddBtn}>
          新增
        </Button>
        <Button className={styles.btn} type="primary" onClick={onChangeBtn}>
          修改
        </Button>
        <Button className={styles.btn} type="danger" onClick={onDelBtn}>
          删除
        </Button>
      </div>
    );
  }
}

export default Index;
