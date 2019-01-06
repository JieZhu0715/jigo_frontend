import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Modal, } from 'antd';
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
            this.showModal("You have to login to make a request!")
        }
        else 
        {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                      values.user_id = current_user._id
                      this.props.request(values, () => {
                        
                        this.showModal("successfully request a new item, our staff will pick up this request soon.");
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
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Description" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('reference', {
                        rules: [{ required: true, message: 'Please input your reference' }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Website or seller site" />
                    )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Request</Button>
                    </FormItem>
            </Form>
            <Modal
                    title="From the page: "
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
