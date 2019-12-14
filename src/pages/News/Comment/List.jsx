import React, { Component } from 'react';
import { Input, Button, DatePicker, Divider, Popconfirm, message, Avatar } from 'antd';
import FilterList from '@/components/common/FilterList';

const { RangePicker } = DatePicker;

const formItems = [
  {
    prop: 'source',
    label: '发布人',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'type',
    label: '类型',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'replyTime',
    label: '回复',
    Component: <RangePicker placeholder={['开始日期', '结束日期']} />,
  },
];

export default class NewsList extends Component {
  columns = [
    {
      dataIndex: 'source',
      title: '发布人',
      render: (text, record) => (
        <>
          <Avatar src={record.avatar} />
          <span className="ml8 vm">{record.source}</span>
        </>
      ),
    },
    {
      dataIndex: 'title',
      title: '内容',
    },
    {
      dataIndex: 'publicTime',
      title: '发布时间',
    },
    {
      dataIndex: 'readCount',
      title: '点赞',
    },
    {
      dataIndex: 'replyCount',
      title: '反对',
    },
    {
      key: 'action',
      title: '其他',
      render: (text, record) => (
        // const { onDetailClick, onDelete } = this.props;
        <span>
          <Button type="link">查看</Button>
          <Button type="link" onClick={() => this.setToTop(record)}>
            置顶
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
    this.filterList = ele;
  };

  setToTop = ({ id }) => {
    // TODO: 置顶
    console.log(id);
  };

  handleDelete = async ({ id }) => {
    console.log(id);
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
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
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
      <div>
        <h2 className="mb16">评论主题： 震惊，竟然发生这种事情</h2>
        <Divider />
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
      </div>
    );
  }
}
