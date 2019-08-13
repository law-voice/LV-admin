import React, { PureComponent } from 'react';
import { Modal, Form, Row, Col, Input } from 'antd';
import Hoc from '@/components/common/Hoc';
import LVselect from '@/components/common/LVselect';

const { Item } = Form;

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
    prop: 'author',
    label: '作者',
    Component: Hoc(
      Input,
      {
        placeholder: '请输入',
      },
      false,
    ),
  },
];

class ModelForm extends React.Component {
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
              <Item label={label}>{getFieldDecorator(prop)(<ItemComponent />)}</Item>
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
