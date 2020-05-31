import React, { Component } from 'react';
import { Input, Button, DatePicker, Divider, Popconfirm, message } from 'antd';
// import router from 'umi/router';
import { connect } from 'dva';
import { CUSTOMER_LIST } from '@/actions/customer';
import { GET_INDUSTRY_LIST, GET_OCCUPATION_LIST, GET_EDUCATION_LIST, GET_USERCATEGORY_LIST } from '@/actions/common';
import FilterList from '@/components/common/FilterList';
import LVSelect from '@/components/common/LVSelect';
// import style from './index.less';

const { RangePicker } = DatePicker;

@connect(({ customer }) => ({
  customer,
}))
export default class UserList extends Component {
  state = {
    apiProps: {
      userTypeEnumStr: 'APP',
    },
    listProps: {
      rowKey: 'userId',
    },
    selectOps: {
      industryCodeOps: [],
      occupationOps: [],
      educationOps: [],
      userCategoryOps: [],
    },
  };

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
      dataIndex: 'username',
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
      dataIndex: 'countNewsComment',
      title: '新闻评论',
    },
    {
      dataIndex: 'countNewsVote',
      title: '投票次数',
    },
    {
      dataIndex: 'countWatchVideo',
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
        <span>
          <Button type="link" onClick={() => this.handleDetailClick(record)} style={{ paddingLeft: 0 }}>
            查看详情
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要拉黑吗？拉黑后该用户不可评论、投票、发布视频。"
            okText="确定"
            cancelText="取消"
            onConfirm={() => this.handleDelete(record)}
          >
            <Button type="link">拉黑</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  api = {
    method: params => this.props.dispatch(CUSTOMER_LIST(params)),
    params: {
      userTypeEnumStr: 'APP',
    },
    decorateParams: params => {
      if (params.registerTime && params.registerTime.length === 2) {
        params.createTimeStartStr = params.registerTime[0].format('YYYY-MM-DD');
        params.createTimeEndStr = params.registerTime[1].format('YYYY-MM-DD');
        delete params.registerTime;
      }
      return {
        ...params,
      };
    },
    decorateItems: item => ({
      ...item,
      registerTime: item.createTime.slice(0, 10),
      statistics: `${item.countOnLineRangYear}/${item.countOnLineRangMonth}/${item.countOnLineRangWeek}`,
    }),
  };

  componentDidMount() {
    this.initselectOps();
  }

  initselectOps = async () => {
    const industryCodeOps = await this.props.dispatch(GET_INDUSTRY_LIST()); // 行业列表
    const occupationOps = await this.props.dispatch(GET_OCCUPATION_LIST()); // 职业列表
    const educationOps = await this.props.dispatch(GET_EDUCATION_LIST()); // 学历列表
    const userCategoryOps = await this.props.dispatch(GET_USERCATEGORY_LIST()); // 用户类型列表
    // 此时所返回的值都是name， value形式的，eg：{name: "博士及以上", value: 1}
    this.setState(prev => ({
      selectOps: {
        ...prev.selectOps,
        industryCodeOps,
        occupationOps,
        educationOps,
        userCategoryOps,
      },
    }));
  };

  formItems = () => {
    const { industryCodeOps, occupationOps, educationOps, userCategoryOps } = this.state.selectOps;
    const formItems = [
      {
        prop: 'name',
        label: '姓名',
        Component: <Input allowClear placeholder="请输入" />,
      },
      {
        prop: 'idCardNo',
        label: '身份证号',
        Component: <Input allowClear placeholder="请输入" />,
      },
      {
        prop: 'username',
        label: '用户名',
        Component: <Input allowClear placeholder="请输入" />,
      },
      {
        prop: 'registerTime',
        label: '注册时间',
        Component: <RangePicker allowClear placeholder={['开始日期', '结束日期']} />,
      },
      {
        prop: 'industryCode',
        label: '行业',
        Component: <LVSelect placeholder="请输入" allowClear options={industryCodeOps} />,
      },
      {
        prop: 'occupationCode',
        label: '职业',
        Component: <LVSelect placeholder="请输入" allowClear options={occupationOps} />,
      },
      {
        prop: 'educationEnumStr',
        label: '学历',
        Component: <LVSelect placeholder="请输入" allowClear options={educationOps} />,
      },
      {
        prop: 'userCategory',
        label: '用户类型',
        Component: <LVSelect placeholder="请输入" allowClear options={userCategoryOps} />,
      },
    ];
    return formItems;
  };

  selectIndustry = val => {
    console.log(val);
  };

  selectOccupation = val => {
    console.log(val);
  };

  selectEducation = val => {
    console.log(val);
  };

  selectUserCate = val => {
    console.log(val);
  };

  handleDetailClick = record => {
    console.log(record);
    const id = record.userId;
    this.props.history.push({ pathname: `/user/customer/detail/${id}` });
    // router.push({ pathname: `/user/customer/detail/${id}` });
  };

  handleDelete = async () => {
    message.success('拉黑成功');
    // send delete request
    this.filterList.queryList();
  };

  setFilterListRef = ele => {
    this.filterList = ele;
  };

  render() {
    console.log(23123543);
    const { apiProps, listProps } = this.state;
    return (
      <FilterList
        ref={this.setFilterListRef}
        api={this.api}
        apiProps={apiProps}
        formItems={this.formItems()}
        listProps={listProps}
        columns={this.columns}
      />
    );
  }
}
