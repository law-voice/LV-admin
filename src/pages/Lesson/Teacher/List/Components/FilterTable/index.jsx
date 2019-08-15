import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Divider, Popconfirm } from 'antd';

class FilterTable extends PureComponent {
  static propTypes = {
    onPageChange: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    pageBean: PropTypes.object.isRequired,
  };

  columns = [
    {
      dataIndex: 'title',
      title: '标题',
      align: 'center',
    },
    {
      dataIndex: 'type',
      title: '类别',
      align: 'center',
    },
    {
      dataIndex: 'author',
      title: '作者',
      align: 'center',
    },
    {
      dataIndex: 'publicTime',
      title: '发布时间',
      align: 'center',
    },
    {
      dataIndex: 'readCount',
      title: '浏览量',
      align: 'center',
    },
    {
      dataIndex: 'replyCount',
      title: '评论数',
      align: 'center',
    },
    {
      key: 'action',
      title: '其他',
      align: 'center',
      render: (text, record) => {
        const { onDetailClick, onDelete } = this.props;
        return (
          <span>
            <Button type="link" onClick={() => onDetailClick(record)}>
              查看详情
            </Button>
            <Divider type="vertical" />
            <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => onDelete(record)}>
              <Button type="link">删除</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: ${selectedRows}`);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  handlePaginationChange = pageNo => {
    this.props.onPageChange({ ...this.props.pageBean, pageNo });
  };

  onShowSizeChange = (pageNo, pageSize) => {
    this.props.onPageChange({ ...this.props.pageBean, pageNo, pageSize });
  };

  render() {
    const { total, pageSize = 10, pageNo = 1 } = this.props.pageBean;
    const pagination = {
      showQuickJumper: true,
      showSizeChanger: true,
      total,
      pageSize,
      current: pageNo,
      onShowSizeChange: this.onShowSizeChange,
      onChange: this.handlePaginationChange,
    };
    let { dataSource, loading } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={dataSource}
          loading={loading}
          rowSelection={this.rowSelection}
          pagination={pagination}
        />
      </div>
    );
  }
}

export default FilterTable;
