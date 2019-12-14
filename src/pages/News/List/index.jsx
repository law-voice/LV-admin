import React, { Component } from 'react';
import { Input, Button, DatePicker, Divider, Popconfirm, message } from 'antd';
import FilterList from '@/components/common/FilterList';

const { RangePicker } = DatePicker;

const formItems = [
  {
    prop: 'title',
    label: '新闻标题',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'type',
    label: '类型',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'publicTime',
    label: '发布时间',
    Component: <RangePicker placeholder={['开始日期', '结束日期']} />,
  },
  {
    prop: 'source',
    label: '素材提供人',
    Component: <Input placeholder="请输入" />,
  },
];

export default class NewsList extends Component {
  columns = [
    {
      dataIndex: 'title',
      title: '标题',
    },
    {
      dataIndex: 'type',
      title: '类别',
    },
    {
      dataIndex: 'source',
      title: '素材提供人',
    },
    {
      dataIndex: 'cardNo',
      title: '提供人身份证',
    },
    {
      dataIndex: 'publicTime',
      title: '发布时间',
    },
    {
      dataIndex: 'readCount',
      title: '浏览量',
    },
    {
      dataIndex: 'replyCount',
      title: '评论数',
    },
    {
      key: 'action',
      title: '其他',
      render: (text, record) => (
        // const { onDetailClick, onDelete } = this.props;
        <span>
          <Button type="link" onClick={() => this.handleDetailClick(record)}>
            查看详情
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => this.handleDelete(record)}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  setFilterListRef = ele => {
    // console.log(testet)
    this.filterList = ele;
  };

  handleDetailClick = ({ id }) => {
    this.props.history.push({ pathname: `/news/details/${id}` });
  };

  handleDelete = async () => {
    message.success('删除成功');
    // send delete request
    this.filterList.queryList();
  };

  api = async () =>
    // TODO: 后续改为真实接口、真实数据
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: {
            items: [
              {
                key: 1,
                id: 1,
                title: '震惊，竟然发生这种事情',
                type: '社会',
                source: '人民日报',
                publicTime: '2019-08-03',
                readCount: 3000,
                replyCount: 232,
              },
            ],
            pageBean: {
              pageNo: 1,
              pageSize: 10,
              total: 100,
            },
          },
        });
      }, 300);
    });

  render() {
    return (
      <FilterList
        ref={this.setFilterListRef}
        api={this.api}
        formItems={formItems}
        columns={this.columns}
        tableProps={{
          bordered: true,
        }}
        renderMiddleBox={
          <Button type="primary" className="mr8">
            新增新闻
          </Button>
        }
      />
    );
  }
}
