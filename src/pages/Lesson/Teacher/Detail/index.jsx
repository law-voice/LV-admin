import React, { PureComponent } from 'react';
import { message } from 'antd';
import ListShow from './Components/ListShow';
import FilterTable from './Components/FilterTable';

class Index extends PureComponent {
  state = {
    data: {
      id: 1,
      name: '王一',
      sex: '男',
      videoCount: 15,
      playCount: 5615,
      heartCount: 815,
      registerTime: '2019-01-01',
      area: '婚姻法、劳动纠纷、民事纠纷',
      workTime: '2015年至今',
      IDnumber: '111111222233334444',
      mobile: '13122225555',
    },
    loading: false,
    pageBean: { pageSize: 10, pageNo: 1, total: 100 },
  };

  static getDerivedStateFromProps() {
    let dataSource = [];
    for (let i = 0; i < 6; i++) {
      dataSource.push({
        key: `00${i}`,
        title: `标题 ${i}`,
        author: `作者 ${i}`,
        type: '婚姻',
        source: '东方传媒',
        cardNo: '-',
        publicTime: '2019-01-01',
        readCount: 9999,
        replyCount: 5671,
      });
    }
    return { dataSource };
  }

  queryList = () => {
    const filter = { pageBean: this.state.pageBean };
    console.log('查询参数', filter);
    this.setState({
      loading: true,
    });
    setTimeout(() => this.setState({ loading: false }), 500);
    // await api.getNewsList({
    //   params: filter
    // })
    console.log('查询成功');
  };

  handleDetailClick = ({ id }) => {
    console.log(id);
    this.props.history.push({ pathname: `/Lesson/Video/Detail/${id}` });
  };

  handleDelete = async ({ id }) => {
    console.log(id);
    message.success('删除成功');
    // send delete request
    this.queryList();
  };

  handlePageChange = pageBean => {
    this.setState({ pageBean }, () => {
      this.queryList();
    });
  };

  render() {
    let { loading, dataSource, pageBean, data } = this.state;
    return (
      <div>
        <ListShow detail={data} />
        <h2>发布的视频</h2>
        <FilterTable
          loading={loading}
          dataSource={dataSource}
          pageBean={pageBean}
          onPageChange={this.handlePageChange}
          onDetailClick={this.handleDetailClick}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Index;
