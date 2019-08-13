import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class Index extends PureComponent {
  static propTypes = {
    onAddBtn: PropTypes.func.isRequired,
    onChangeBtn: PropTypes.func.isRequired,
  };

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
