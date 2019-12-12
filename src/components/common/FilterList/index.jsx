import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';

import FilterForm from './FilterForm';
import FilterTable from './FilterTable';

/**
 * api 为列表查询的接口，改接口返回格式做强制要求, {data: {item: [], pageBean: {}}}
 * formItems 为一个 {prop, label, Component, options, ...ohterProps} 组成的对象数组
 *  - prop: 表单绑定的字段
 *  - label: 表单 label
 *  - Component: 表单渲染的组件
 *  - options 同 getFieldDecorator(id, options) 的 option 参数。可参考: https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0
 *  - otherProps 同 Form.Item 的 prop。可参考: https://ant.design/components/form-cn/#Form.Item
 * formProps 为 Form 的 Props, 可参考: https://ant.design/components/form-cn/#Form
 * columns 同 Table Props 的 column, 可参考: https://ant.design/components/table-cn/#Column
 * tableProps  同 Table Props, 可参考: https://ant.design/components/table-cn/#Table。 当 tableProps 包含 columns 时会忽略
 * renderMiddleBox 渲染表单与表格中间的内容，比如按钮组或其他展示块
 */
export default class FilterList extends Component {
  static propTypes = {
    formItems: PropTypes.array,
    formProps: PropTypes.object,
    columns: PropTypes.array,
    tableProps: PropTypes.object,
    renderMiddleBox: PropTypes.node,
    api: PropTypes.func.isRequired, // 查询列表的接口
  };

  static defaultProps = {
    formItems: [],
    formProps: {},
    tableProps: {},
    columns: [],
    renderMiddleBox: null,
  };

  state = {
    loading: false,
    pageBean: { pageSize: 10, pageNo: 1, total: 0 },
    data: [],
  };

  componentDidMount() {
    this.queryList();
  }

  queryList = async () => {
    const filter = { form: this.form.getFieldsValue(), pageBean: this.state.pageBean };
    console.log('查询参数', filter);
    this.setState({ loading: true });
    let {
      data: { items, pageBean },
    } = await this.props.api({
      params: filter,
    });
    this.setState({ loading: false, data: items, pageBean });
    console.log('查询成功');
  };

  handlePageChange = pageBean => {
    this.setState({ pageBean }, this.queryList);
  };

  render() {
    const { formItems, formProps, tableProps, renderMiddleBox, columns } = this.props;
    const { loading, data, pageBean } = this.state;
    return (
      <div>
        <FilterForm
          formItems={formItems}
          formProps={formProps}
          wrappedComponentRef={form => {
            this.form = form && form.props.form;
          }}
          onSearch={this.queryList}
        />
        <Divider style={{ margin: '0 0 16px' }} />
        {renderMiddleBox && <div className="pb16">{renderMiddleBox}</div>}
        <FilterTable
          loading={loading}
          data={data}
          columns={columns}
          pageBean={pageBean}
          {...tableProps}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
