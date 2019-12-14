import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, List } from 'antd';

export default class FilterTable extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['table', 'list']),
    // 如果 type 为 table, 则 Props 可参考: https://ant.design/components/table-cn/#Table
    // 如果 type 为 list, 则 Props 可参考: https://ant.design/components/list-cn/#List
    listProps: PropTypes.object,
    loadingText: PropTypes.string,
    formData: PropTypes.object,
  };

  static defaultProps = {
    type: 'table',
    formData: {},
    loadingText: '数据加载中...',
    listProps: {},
  };

  handlePaginationChange = pageNo => {
    this.props.onPageChange({ ...this.props.pageBean, pageNo });
  };

  onShowSizeChange = (pageNo, pageSize) => {
    this.props.onPageChange({ ...this.props.pageBean, pageNo, pageSize });
  };

  render() {
    const {
      data,
      loading,
      loadingText,
      pageBean: { total, pageSize = 10, pageNo = 1 },
      listProps,
      type,
    } = this.props;

    const pagination = {
      showQuickJumper: true,
      showSizeChanger: true,
      total,
      pageSize,
      current: pageNo,
      onShowSizeChange: this.onShowSizeChange,
      onChange: this.handlePaginationChange,
    };

    const finallyProp = {
      pagination,
      ...listProps,
      dataSource: data,
      loading: {
        spinning: loading,
        tip: loadingText,
      },
    };

    let ListComponent = type === 'table' ? Table : List;

    return <ListComponent {...finallyProp} />;
  }
}
