import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Row, Col, Input, DatePicker } from 'antd';
import LVselect from '@/components/common/LVselect';

const { Item } = Form;
const { RangePicker } = DatePicker;

const options = [
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
];

const formItems = [
  {
    prop: 'title',
    label: '新闻标题',
    Component: <Input placeholder="请输入" />,
  },
  {
    prop: 'type',
    label: '类型',
    Component: <LVselect placeholder="请输入" options={options} />,
  },
  {
    prop: 'publicTime',
    label: '发布时间',
    Component: <RangePicker placeholder={['开始日期', '结束日期']} />,
  },
  {
    prop: 'source',
    label: '素材提供人',
    Component: <Input placeholder="请输入" />,
  },
];

class ModelForm extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
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
  };

  render() {
    let { getFieldDecorator } = this.props.form;
    return (
      <Form {...this.formLayout} onSubmit={this.handleSubmit} onReset={this.handleReset}>
        <Row gutter={16}>
          {formItems.map(({ prop, label, Component: ItemComponent }) => (
            <Col key={prop} xs={24} sm={24} md={24} lg={24}>
              <Item label={label}>
                {getFieldDecorator(prop, {
                  initialValue: this.state.form[prop],
                })(ItemComponent)}
              </Item>
            </Col>
          ))}
        </Row>
      </Form>
    );
  }
}

const WrappedChangeModel = Form.create({ name: 'add' })(ModelForm);

class MyModel extends PureComponent {
  handleOk = () => {
    const filter = { form: this.form.props.form.getFieldsValue() };
    console.log('查询参数', filter);
  };

  render() {
    let { visible, onHide } = this.props;
    return (
      <Modal title="新增信息" centered visible={visible} onOk={this.handleOk} onCancel={onHide} cancelText="取消">
        <WrappedChangeModel
          wrappedComponentRef={theForm => {
            this.form = theForm;
          }}
        />
      </Modal>
    );
  }
}

export default MyModel;
