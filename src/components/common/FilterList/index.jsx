import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';

import FilterForm from './FilterForm';
import List from './List';

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
 * listProps  同 ./List 的listProps
 * type 同 ./List type
 * renderMiddleBox 渲染表单与表格中间的内容，比如按钮组或其他展示块
 * renderList 为一个函数。该函数接收两个参数(data: Array 列表数据, form: Object 筛选表单绑定值)，必须返回 ReactNode
 * loadingText loading 时的文案
 */

export default class FilterList extends Component {
  static propTypes = {
    type: List.propTypes.type,
    formItems: PropTypes.array,
    formProps: PropTypes.object,
    columns: PropTypes.array,
    renderMiddleBox: PropTypes.node,
    api: PropTypes.func.isRequired,
    listProps: List.propTypes.listProps,
    loadingText: List.propTypes.loadingText,
  };

  static defaultProps = {
    type: 'table',
    formItems: [],
    formProps: {},
    listProps: {},
    columns: [],
    renderMiddleBox: null,
    loadingText: List.defaultProps.loadingText,
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
    const filter = { form: this.form ? this.form.getFieldsValue() : {}, pageBean: this.state.pageBean };
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
    const { formItems, formProps, renderMiddleBox, columns, listProps, loadingText, type } = this.props;
    const { loading, data, pageBean } = this.state;

    const formData = this.form ? this.form.getFieldsValue() : {};

    console.log('listProps', listProps);

    const finallyListProp = type === 'table' ? { ...listProps, columns } : listProps;

    return (
      <div>
        {formItems && formItems.length ? (
          <>
            <FilterForm
              formItems={formItems}
              formProps={formProps}
              wrappedComponentRef={form => {
                this.form = form && form.props.form;
              }}
              onSearch={this.queryList}
            />
            <Divider style={{ margin: '0 0 16px' }} />
          </>
        ) : null}
        {renderMiddleBox && <div className="pb16">{renderMiddleBox}</div>}
        <List
          type={type}
          formData={formData}
          listProps={finallyListProp}
          data={data}
          loading={loading}
          pageBean={pageBean}
          loadingText={loadingText}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
