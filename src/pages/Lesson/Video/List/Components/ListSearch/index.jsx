import React from 'react';
import { Row, Col, Input, Button, DatePicker, Form } from 'antd';
import Hoc from '@/components/common/Hoc';
import LVselect from '@/components/common/LVselect';

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
    Component: Hoc(LVselect, {
      placeholder: '请选择类型',
      options: [
        {
          value: '01',
          name: '婚姻',
        },
        {
          value: '02',
          name: '民事',
        },
        {
          value: '03',
          name: '刑法',
        },
      ],
    }),
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

class FilterListSearch extends React.Component {
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

  handleReset = () => {
    this.props.form.resetFields();
    this.props.onSearch();
  };

  render() {
    let { getFieldDecorator } = this.props.form;
    return (
      <Form {...this.formLayout} onSubmit={this.handleSubmit} onReset={this.handleReset}>
        <Row gutter={16}>
          {formItems.map(({ prop, label, Component: ItemComponent }) => (
            <Col key={prop} xs={24} sm={12} md={8} lg={6}>
              <Item label={label}>{getFieldDecorator(prop)(<ItemComponent />)}</Item>
            </Col>
          ))}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Item>
              <Button type="primary" htmlType="submit" className="mr16">
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

const ListSearch = Form.create({ name: 'filterList' })(FilterListSearch);
export default ListSearch;
