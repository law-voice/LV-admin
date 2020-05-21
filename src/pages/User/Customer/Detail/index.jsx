import React, { Component } from 'react';
import { Descriptions, Tabs } from 'antd';
// import { formatDate } from '@/utils/format';
// import Reply from './components/Comment';
// import Vote from './components/Vote';
// import Statistic from './components/Statistic';

// import style from './index.less';

const { TabPane } = Tabs;
const items = [
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '性别',
    prop: 'sex',
  },
  {
    label: '身份证号',
    prop: 'idCardNo',
  },
  {
    label: '用户名',
    prop: 'username',
  },
  {
    label: '用户类型',
    prop: 'userType',
  },
  {
    label: '注册时间',
    prop: 'registerTime',
  },
  {
    label: '年/月/周上线次数',
    prop: 'statistics',
  },
  {
    label: '学历',
    prop: 'education',
  },
  {
    label: '新闻评论',
    prop: 'countNewsComment',
  },
  {
    label: '投票次数',
    prop: 'countNewsVote',
  },
  {
    label: '视频观看次数',
    prop: 'countWatchVideo',
  },
  {
    label: '行业',
    prop: 'industry',
  },
  {
    label: '职业',
    prop: 'occupation',
  },
];

// function Article({ content }) {
//   // 处理 xss
//   const html = {
//     __html: content,
//   };
//   /* 富文本展示？ */
//   return <div className={style.content} dangerouslySetInnerHTML={html} />;
// }

class Detail extends Component {
  state = {
    data: {
      userId: 3,
      username: '10010',
      nickName: '联通',
      name: '中国联通',
      avatar:
        'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190115/87868f21befc4e7f9007aa71efa79621.jpeg',
      idCardNo: '123456789043215678',
      industry: 'IT',
      occupation: 'Java服务端开发',
      sex: '女',
      userType: '普通用户',
      education: '高中及以下',
      statistics: '0/0/0',
      countNewsVote: '暂未开发',
      countNewsComment: '暂未开发',
      countWatchVideo: '暂未开发',
      registerTime: '2020-01-09',
      lastLoginTime: '2020-01-09 16:58:03',
    },
    tabs: [
      {
        label: '参与的新闻',
        Component: <div>内容：参与的新闻</div>,
      },
      {
        label: '发布的视频',
        Component: <div>内容：发布的视频</div>,
      },
    ],
  };

  componentDidMount() {
    console.log(this.props);
    // this.props.dispatch(GET_CUSTOMER_DETAIL(this.match.params.id))
  }

  tabs = () => {
    // if (a) {
    const publish = {
      label: '发布的视频',
      Component: <div>内容：发布的视频</div>,
    };
    this.setState(prev => ({
      tabs: {
        ...prev.tabs,
        publish,
      },
    }));
    // 被上面的方法替代，错误原因：在引用前一个状态时在setState中使用回调；解决方法：使用以前一个状态（prevState）作为第一个参数的回调可以避免这种情况
    // this.setState({
    //   tabs: {
    //     ...this.state.tabs,
    //     publish,
    //   },
    // });
    // console.log(this.state);
    // }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Descriptions title="新闻详情" column={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          {items.map(({ label, prop }) => (
            <Descriptions.Item key={prop} label={label}>
              {this.state.data[prop]}
            </Descriptions.Item>
          ))}
        </Descriptions>
        <Tabs>
          {this.state.tabs.map(({ label, Component: itemComponent }) => (
            <TabPane tab={label} key={label}>
              {itemComponent}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Detail;
