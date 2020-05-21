import React, { Component } from 'react';
import { Input, Button, DatePicker, Divider, Popconfirm, message } from 'antd';
import FilterList from '@/components/common/FilterList';
import { connect } from 'dva';
import { CUSTOMER_LIST } from '@/actions/customer';
// import styles from './index.less';

const { RangePicker } = DatePicker;

const formItems = [
  {
    prop: 'nickName',
    label: '姓名',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'cardNo',
    label: '身份证号',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'userName',
    label: '用户名',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'registerTime',
    label: '注册时间',
    Component: <RangePicker placeholder={['开始日期', '结束日期']} />,
  },
  {
    prop: 'industry',
    label: '行业',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'profession',
    label: '职业',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'education',
    label: '学历',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'userType',
    label: '用户类型',
    Component: <Input placeholder="请输入" />,
  },
];

// @connect(({ customer }) => ({
//   customerList: customer.customerList,
// }))
@connect(({ customer }) => ({
  customer,
}))
export default class AdminList extends Component {
  columns = [
    {
      dataIndex: 'name',
      title: '姓名',
    },
    {
      dataIndex: 'sexEnum.desc',
      title: '性别',
    },
    {
      dataIndex: 'idCardNo',
      title: '身份证号',
    },
    {
      dataIndex: 'userName',
      title: '用户名',
    },
    {
      dataIndex: 'userType',
      title: '用户类型',
    },
    {
      dataIndex: 'registerTime',
      title: '注册时间',
    },
    {
      dataIndex: 'statistics',
      title: '年/月/周上线次数',
    },
    {
      dataIndex: 'commentCount',
      title: '新闻评论',
    },
    {
      dataIndex: 'voteCount',
      title: '投票次数',
    },
    {
      dataIndex: 'videoCount',
      title: '视频观看次数',
    },
    {
      dataIndex: 'industry',
      title: '行业',
    },
    {
      dataIndex: 'occupation',
      title: '职业',
    },
    {
      dataIndex: 'educationEnum.desc',
      title: '学历',
    },
    {
      key: 'action',
      title: '其他',
      render: (text, record) => (
        // const { onDetailClick, onDelete } = this.props;
        <span>
          <Button type="link" onClick={() => this.handleDetailClick(record)} style={{ paddingLeft: 0 }}>
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

  state = {
    queryParams: {
      userTypeEnumStr: 'APP',
      pageSize: 10,
      pageNumber: 1,
      username: '',
      nickName: '',
      idCardNo: '',
      createTimeStartStr: '',
      createTimeEndStr: '',
      industryCode: '',
      occupationCode: '',
      educationEnumStr: '',
    },
  };

  // componentDidMount() {
  //   this.props.dispatch(CUSTOMER_LIST(this.state.queryParams));
  // }

  setFilterListRef = ele => {
    this.filterList = ele;
  };

  handleDetailClick = ({ id }) => {
    this.props.history.push({ pathname: `/user/customer/detail/${id}` });
    // router.push({ pathname: `/user/customer/detail/${id}` });
  };

  handleDelete = async () => {
    message.success('删除成功');
    // send delete request
    this.filterList.queryList();
  };

  api = async () => {
    // TODO: 后续改为真实接口、真实数据
    const data = await this.props.dispatch(CUSTOMER_LIST(this.state.queryParams));
    return new Promise(resolve => {
      resolve({
        data,
      });
    });
  };

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
            新增管理员
          </Button>
        }
      />
    );
  }
}
