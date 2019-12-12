import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

/**
 * 本组件 Props 同 Table 的 Props 可参考: https://ant.design/components/table-cn/#Table
 */
export default class FilterTable extends Component {
  static propTypes = {
    columns: PropTypes.array,
    tableProps: PropTypes.object,
  };

  static defaultProps = {
    columns: [],
    tableProps: {},
  };

  handlePaginationChange = pageNo => {
    this.props.onPageChange({ ...this.props.pageBean, pageNo });
  };

  onShowSizeChange = (pageNo, pageSize) => {
    this.props.onPageChange({ ...this.props.pageBean, pageNo, pageSize });
  };

  render() {
    const {
      columns,
      data,
      loading,
      pageBean: { total, pageSize = 10, pageNo = 1 },
      ...otherProps
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

    return (
      <div>
        <Table
          {...otherProps}
          columns={columns}
          dataSource={data}
          loading={loading}
          rowSelection={this.rowSelection}
          pagination={pagination}
        />
      </div>
    );
  }
}
