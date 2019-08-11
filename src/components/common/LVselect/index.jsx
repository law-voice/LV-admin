import React, { PureComponent } from 'react';
import { Select, Option } from 'antd';

class LVselect extends PureComponent {
  render() {
    let { options, ...otherProps } = this.props;
    return (
      <Select {...otherProps}>
        {options.map(item => (
          <Option value={item.value}>{item.name}</Option>
        ))}
      </Select>
    );
  }
}

export default LVselect;
