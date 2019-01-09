import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, InputNumber, Button, Modal, } from 'antd';
import { request } from '../actions/request'

import '../css/App.css';

const FormItem = Form.Item;

class ItemRequestPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = {visible: false}
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { current_user } = this.props
        if (!current_user) 
        {
            this.showModal("您还没有登陆, 请登陆发送请求.")
        }
        else 
        {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                      values.user_id = current_user._id
                      this.props.request(values, () => {
                        
                        this.showModal("成功请求了一个新商品,我们会添加它到系统.");
                        this.handleReset()
                    })
                }
              });
        }
    }

    showModal = (message) => {
        this.setState({
          visible: true,
          message: message
        });
      }
    
    handleOk = (e) => {
        this.setState({
          visible: false,
        });
      }
    
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
      return (
        <div className="App">
            <Form onSubmit={ this.handleSubmit }>
                    <FormItem>
                    {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please input some description!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="商品简介" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('reference', {
                        rules: [{ message: 'Please input your reference' }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="官网或者其他在售网站(可选填)" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('quantity', {
                    rules: [{ message: 'Select quantity' }],
                    })(
                        <InputNumber placeholder="您将购买几件该商品(可选填)" />
                    )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </FormItem>
            </Form>
            <Modal
                    title="添加请求: "
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={ this.handleCancel }>
                        <p> { this.state.message } </p>
            </Modal>
        </div>
      );
    }
}

const mapStateToProps = state => ({
    current_user: state.users.user,
})


const WrappedItemRequestPage = Form.create()(ItemRequestPage);

export default connect(mapStateToProps, { request })(WrappedItemRequestPage)
