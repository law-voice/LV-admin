import React, { Component, useCallback } from 'react';
import { Table, Form, Input, Button, DatePicker, Row, Col, Divider, Popconfirm, message, Select, Option } from 'antd';

import Hoc from '@/components/common/Hoc';

const { Item } = Form;
const { RangePicker } = DatePicker;

const formItems = [
  {
    prop: 'title',
    label: '新闻标题',
    Component: Hoc(
      Input,
      {
        placeholder: '请输入',
      },
      false,
    ),
  },
  {
    prop: 'type',
    label: '类型',
    Component: Hoc(
      Select,
      {
        placeholder: '请输入',
      },
      false,
    ),
  },
  {
    prop: 'publicTime',
    label: '发布时间',
    Component: Hoc(
      RangePicker,
      {
        placeholder: ['开始日期', '结束日期'],
      },
      false,
    ),
  },
  {
    prop: 'source',
    label: '素材提供人',
    Component: Hoc(
      Input,
      {
        placeholder: '请输入',
      },
      false,
    ),
  },
];

class FilterForm extends Component {
  state = {
    form: {},
  };

  constructor(props) {
    super(props);
    this.formLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 18 },
      },
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch();
  };

  handleReset = e => {
    // e.preventDefault();
    this.props.form.resetFields();
    this.props.onSearch();
  };

  render() {
    let { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <Form {...this.formLayout} onSubmit={this.handleSubmit} onReset={this.handleReset}>
        <Row gutter={16}>
          {formItems.map(({ prop, label, Component: ItemComponent }) => (
            <Col key={prop} xs={24} sm={12} md={8} lg={6}>
              <Item label={label} hasFeedback>
                {getFieldDecorator(prop, {
                  initialValue: this.state.form[prop],
                  rules: [{ required: true, message: 'Please input your E-mail!' }],
                })(<ItemComponent />)}
              </Item>
            </Col>
          ))}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Item>
              <Button type="primary" htmlType="submit" className="mr8">
                搜索
              </Button>
              <Button htmlType="reset">重置</Button>
            </Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedFilterForm = Form.create({ name: 'filter' })(FilterForm);

class FilterTable extends Component {
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
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.props.data}
          loading={this.props.loading}
          rowSelection={this.rowSelection}
          pagination={pagination}
        />
      </div>
    );
  }
}

export default class NewsList extends Component {
  state = {
    data: [
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
    pageBean: { pageSize: 10, pageNo: 1, total: 100 },
    loading: false,
  };

  queryList = () => {
    const filter = { form: this.form.props.form.getFieldsValue(), pageBean: this.state.pageBean };
    console.log('查询参数', filter);
    this.setState({ loading: true });
    setTimeout(() => this.setState({ loading: false }), 500);
    // await api.getNewsList({
    //   params: filter
    // })
    console.log('查询成功');
  };

  handlePageChange = pageBean => {
    this.setState({ pageBean }, () => {
      this.queryList();
    });
  };

  handleDetailClick = ({ id }) => {
    this.props.history.push({ pathname: `/news/detail/${id}` });
  };

  handleDelete = async ({ id }) => {
    message.success('删除成功');
    // send delete request
    this.queryList();
  };

  render() {
    return (
      <div>
        <WrappedFilterForm
          wrappedComponentRef={form => {
            this.form = form;
          }}
          onSearch={this.queryList}
        />
        <Divider style={{ margin: '0 0 16px' }} />
        <div className="pb16">
          <Button type="primary" className="mr8">
            新增新闻
          </Button>
          <Button type="primary">批量删除</Button>
        </div>
        <FilterTable
          loading={this.state.loading}
          data={this.state.data}
          pageBean={this.state.pageBean}
          onPageChange={this.handlePageChange}
          onDetailClick={this.handleDetailClick}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}
