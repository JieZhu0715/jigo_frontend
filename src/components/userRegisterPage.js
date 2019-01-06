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
                console.log('register successfully, please log in')
                this.handleReset();
                this.showModal()
            })
        }
      });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
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
                    rules: [{ required: true, message: 'Please input your user name!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="User name" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your Email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }, { validator: this.validateToNextPassword, }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('confirm_password', {
                    rules: [{ required: true, message: 'Please input your Password!' }, { validator: this.compareToFirstPassword, }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                    )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">Register</Button>
                    </FormItem>
                </Form>
                <Modal
                    title="Success"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                        <p> You successfully regisered as a user. Happy hacking the site. </p>
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
