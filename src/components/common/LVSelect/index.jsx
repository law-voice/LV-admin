import React, { PureComponent } from 'react';
import { Select } from 'antd';

let { Option } = Select;

class TheSelect extends PureComponent {
  render() {
    let { options, ...otherProps } = this.props;
    return (
      <Select {...otherProps}>
        {options.map(item => (
          <Option key={item.value}>{item.name}</Option>
        ))}
      </Select>
    );
  }
}

export default TheSelect;
