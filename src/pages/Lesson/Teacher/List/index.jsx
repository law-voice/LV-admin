import React, { Component } from 'react';
import { message, Divider } from 'antd';
import ListSearch from './Components/ListSearch';
import ChangeModel from './Components/ChangeModel';
// import TableHeadBtn from './Components/TableHeadBtn';
import FilterTable from './Components/FilterTable';

class Index extends Component {
  state = {
    visible: false,
    form: {},
    loading: false,
    pageBean: { pageSize: 10, pageNo: 1, total: 100 },
  };

  static getDerivedStateFromProps() {
    let dataSource = [];
    for (let i = 0; i < 16; i++) {
      dataSource.push({
        key: `00${i}`,
        name: `王 ${i}`,
        sex: '男',
        videoCount: 15,
        playCount: 5615,
        heartCount: 815,
        registerTime: '2019-01-01',
        area: '婚姻法、劳动纠纷、民事纠纷',
        workTime: '2015年至今',
        IDnumber: '111111222233334444',
        mobile: '13122225555',
      });
    }
    return { dataSource };
  }

  // list-search 组件
  queryList = () => {
    const filter = { form: this.form.props.form.getFieldsValue(), pageBean: this.state.pageBean };
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

  handleHide = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = data => {
    console.log(data);
  };

  // ChangeModel 组件
  handleFormChange = form => {
    this.setState({ form });
  };

  // TableHeadBtn 组件
  handleAdd = () => {
    this.setState({
      visible: true,
      form: {},
    });
  };

  handleChange = () => {
    message.error('此功能尚未开发');
  };

  // table 表格
  handlePageChange = pageBean => {
    this.setState({ pageBean }, () => {
      this.queryList();
    });
  };

  handleDetailClick = ({ id }) => {
    console.log(id);
    this.props.history.push({ pathname: `/Lesson/Teacher/Detail/${id}` });
  };

  handleDelete = async ({ id }) => {
    console.log(id);
    message.success('删除成功');
    // send delete request
    this.queryList();
  };

  render() {
    let { visible, form, loading, dataSource, pageBean } = this.state;
    return (
      <div className="page">
        <ListSearch
          wrappedComponentRef={theForm => {
            this.form = theForm;
          }}
          onSearch={this.queryList}
        />
        <ChangeModel
          visible={visible}
          form={form}
          onHide={this.handleHide}
          onOk={this.handleOk}
          onFormChange={this.handleFormChange}
        />
        <Divider style={{ margin: '0 0 16px' }} />
        {/* <TableHeadBtn onAddBtn={this.handleAdd} onChangeBtn={this.handleChange} /> */}
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
