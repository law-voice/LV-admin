import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Comment extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  componentDidMount() {
    // dispatch query
    console.log(this.props.id);
  }

  render() {
    return <div>投票</div>;
  }
}
