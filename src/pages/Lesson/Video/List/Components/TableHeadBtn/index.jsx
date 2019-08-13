import React, { PureComponent } from 'react';
import { Button } from 'antd';

class Index extends PureComponent {
  render() {
    let { onAddBtn, onChangeBtn } = this.props;
    return (
      <div style={{ margin: '15px 0' }}>
        <Button className="mr16" type="primary" onClick={onAddBtn}>
          新增
        </Button>
        <Button type="primary" onClick={onChangeBtn}>
          修改
        </Button>
      </div>
    );
  }
}

export default Index;
