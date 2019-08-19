import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

export default class LVButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    onClick: () => {},
    children: '确定',
  };

  state = {
    loading: false,
  };

  handleClick = async () => {
    this.setState({ loading: true });
    try {
      await this.props.onClick();
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    let { onClick, children, ...otherProps } = this.props;
    return (
      <Button loading={this.state.loading} onClick={this.handleClick} {...otherProps}>
        {children}
      </Button>
    );
  }
}
