import React, { PureComponent } from 'react';
import { Table, message } from 'antd';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ListSearch from './Components/ListSearch';
import MyModel from './Components/ChangeModel';
import TableHeadBtn from './Components/TableHeadBtn';

class Index extends PureComponent {
  state = {
    visible: false,
    form: {},
    dataSource: [
      {
        key: '0001',
        title: 'John Brown 1',
        author: 'new作者 1',
        type: '婚姻',
      },
      {
        key: '0002',
        title: 'John Brown 2',
        author: 'new作者 2',
        type: '民事',
      },
      {
        key: '0003',
        title: 'John Brown 3',
        author: 'new作者 3',
        type: '刑事',
      },
      {
        key: '0004',
        title: 'John Brown 4',
        author: 'new作者 4',
        type: '劳动保障',
      },
    ],
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
        render: text => <Link to="/Lesson/Video/Detail">{text}</Link>,
      },
      {
        title: '婚姻',
        dataIndex: 'author',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '视频类型',
        dataIndex: 'type',
      },
    ],
  };

  componentWillMount() {
    let data = [];
    for (let i = 0; i < 16; i++) {
      data.push({
        key: `00${i}`,
        title: `标题 ${i}`,
        author: `作者 ${i}`,
        type: '婚姻',
      });
    }
    this.setState({
      dataSource: data,
    });
  }

  // list-search 组件
  handleSearchParam = param => {
    console.log(param);
    if (param) {
      let data = [];
      for (let i = 0; i < 6; i++) {
        data.push({
          key: i,
          title: `new 标题 ${i}`,
          author: `new 作者 ${i}`,
          type: 'new 婚姻',
        });
      }
      this.setState({
        dataSource: data,
      });
    }
  };

  handleHide = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    let {
      dataSource,
      form: { title, author, type },
    } = this.state;
    dataSource.unshift({
      key: `00${dataSource.length}`,
      title,
      author,
      type,
    });
    this.setState({
      visible: false,
      dataSource,
    });
  };

  // MyModel 组件
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
    let { selectedRows } = this.state;
    if (selectedRows.length !== 1) {
      message.error('必须且只能选中一条');
    } else {
      this.setState({
        visible: true,
        form: selectedRows[0],
      });
    }
  };

  handleDel = () => {
    let { selectedArr, dataSource } = this.state;
    if (selectedArr.length < 1) {
      message.error('至少选中一条');
    } else {
      let cloneData = [...dataSource];
      for (let i = 0; i < cloneData.length; i++) {
        for (let j = 0; j < selectedArr.length; j++) {
          if (cloneData[i].key === selectedArr[j]) {
            cloneData.splice(i, 1);
          }
        }
      }
      this.setState({
        dataSource: cloneData,
      });
    }
  };

  render() {
    const rowSelection = {
      onChange: (selectedArr, selectedRows) => {
        this.setState({
          selectedArr,
          selectedRows,
        });
      },
    };
    let { visible, form, columns, dataSource } = this.state;
    return (
      <div className="page">
        <ListSearch
          wrappedComponentRef={theForm => {
            this.form = theForm;
          }}
          onSearch={this.queryList}
        />
        <MyModel
          visible={visible}
          form={form}
          onHide={this.handleHide}
          onOk={this.handleOk}
          onFormChange={this.handleFormChange}
        />
        <TableHeadBtn onAddBtn={this.handleAdd} onChangeBtn={this.handleChange} onDelBtn={this.handleDel} />
        <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection} pagination />
      </div>
    );
  }
}

export default Index;
