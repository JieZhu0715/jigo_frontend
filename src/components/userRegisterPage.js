import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Modal, } from 'antd';

import { register } from '../actions/users'
import '../css/App.css';

const FormItem = Form.Item;

class UserRegisterPage extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {visible: false}
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
    handleOk = (e) => {
        this.setState({
          visible: false,
        });
        // Jump to main page
        this.props.history.push('/');
      }
    
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }

    handleReset = () => {
        this.props.form.resetFields();
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.props.form.validateFields((err, values) => {
          console.log(values)
            if (!err) {
                this.props.register(values, () => {
                this.handleReset();
                this.showModal()
            })
        }
      });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('请确保输入相同密码!');
        } else {
          callback();
        }
      }
  
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    
    
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="App" id='login-page'>
           <header className="App-header">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                    {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入邮箱用于登陆!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="登录邮箱" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }, { validator: this.validateToNextPassword, }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('confirm_password', {
                    rules: [{ required: true, message: '请重新输入密码' }, { validator: this.compareToFirstPassword, }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
                    )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
                    </FormItem>
                </Form>
                <Modal
                    title="注册成功"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                        <p> 您已经成功注册,请返回登. </p>
                </Modal>
            </header>
        </div>
      );
    }
}

const WrappedRegisterPage = Form.create()(UserRegisterPage);

const mapStateToProps = (state) => ({
    user: state.users.user,
    loading: state.users.loading,
    error: state.users.loading
})

export default connect(mapStateToProps, { register })(WrappedRegisterPage)
