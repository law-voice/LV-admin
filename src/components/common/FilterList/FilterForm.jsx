import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import LVButton from '@/components/common/LVButton';

const { Item } = Form;

/**
 * formProps 为 Form 的 Props, 可参考: https://ant.design/components/form-cn/#Form
 * formItems 为一个 {prop, label, Component, options, ...ohterProps} 组成的对象数组
 *  - prop: 表单绑定的字段
 *  - label: 表单 label
 *  - Component: 表单渲染的组件
 *  - options 同 getFieldDecorator(id, options) 的 option 参数。可参考: https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0
 *  - otherProps 同 Form.Item 的 prop。可参考: https://ant.design/components/form-cn/#Form.Item
 */
class FilterForm extends Component {
  static propTypes = {
    formItems: PropTypes.array,
    onSearch: PropTypes.func.isRequired,
    formProps: PropTypes.object,
  };

  static defaultProps = {
    formItems: [],
    formProps: {},
  };

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
    this.props.form.resetFields();
    this.props.onSearch();
  };

  render() {
    let {
      formItems,
      formProps,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form {...this.formLayout} {...formProps} onSubmit={this.handleSubmit} onReset={this.handleReset}>
        <Row gutter={16}>
          {formItems.map(({ prop, label, Component: ItemComponent, options, ...otherProps }) => (
            <Col key={prop} xs={24} sm={12} md={8} lg={6}>
              <Item label={label} {...otherProps}>
                {getFieldDecorator(prop, {
                  initialValue: this.state.form[prop],
                  ...options,
                })(ItemComponent)}
              </Item>
            </Col>
          ))}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Item>
              <LVButton type="primary" htmlType="submit" className="mr8">
                搜索
              </LVButton>
              <LVButton htmlType="reset">重置</LVButton>
            </Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create({ name: 'filter' })(FilterForm);
