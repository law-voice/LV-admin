import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import { LOGIN } from '@/actions/login';
import styles from './index.less';

@connect(({ login }) => ({
  login,
}))
@Form.create()
class Login extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(LOGIN(values));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.formBox}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
