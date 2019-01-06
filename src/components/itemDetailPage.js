import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, InputNumber, Modal } from 'antd';

import marked from 'marked';
import hljs from 'highlight.js';
import '../css/marked.css';

import UserCard from './userCard'
import { getItem } from '../actions/items'
import { order } from '../actions/orders'
import { currentUser } from '../actions/users'

const FormItem = Form.Item;


class ItemDetailPage extends Component {
    constructor(props)
    {
        super(props)
        this.state = { visible: false }
    }
    
    componentDidMount() {
		// marked config
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false,
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			},
        });
        
        // Load Item
        let _id = this.props.match.params._id;
        this.props.getItem(_id);

        // get current user 
        this.props.currentUser()
    }
    
    
    showModal = (message) => {
        this.setState({
          visible: true,
          message
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
    
    handleSubmit = (event) => {
        event.preventDefault();
        let { current_user, display_item } = this.props
        this.props.form.validateFields((err, values) => {
          if (!err) {
              if (this.props.current_user)
              {
                values.user_id = current_user._id
              }
              else
              {
                  // Some fake sure id 
                  values.user_id = '5af584ebb62aae2fa8e406a2'
                  if (!values.email && !values.wechat)
                  {
                    this.showModal('You have not logged in. In order to make an order, you have to login or input email/wechat.')
                    return 
                  }
              }
              values.item_id = display_item._id 

              this.props.order(values, () => {
                    this.handleReset()
                    this.showModal('You made an order successfully. Our staff will contact you shortly.')
              })
          }
        });
    }



    render() {
        let { display_item } = this.props;
        let { getFieldDecorator } = this.props.form;
        if (!display_item) 
        {
            return (<div>Loading items</div>)
        }
        else
        {
            return (
            <div className="content">
                <div className="header">
					<div className="title" style={{ margin: "20px 0 0", textAlign: "center", fontSize: "34px", fontWeight: "bold" }}> {display_item.name} </div>
                </div>
                <UserCard user_id={ display_item.created_by } />
                <div
                id="content"
                className="article-detail"
                dangerouslySetInnerHTML={{
                  __html: display_item.content ? marked(display_item.content) : null,
                }}
                />
                
                <Form onSubmit={this.handleSubmit} className="order-form">

                    <FormItem>
                    {getFieldDecorator('email', {
                    rules: [{ 
                        message: 'Please input your Email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email(Optional)" />
                    )}
                    </FormItem>

                    <FormItem>
                    {getFieldDecorator('wechat', {
                    rules: [{ 
                        message: 'Please input your Wechat!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Wechat(Optional)" />
                    )}
                    </FormItem>

                    <FormItem>
                    {getFieldDecorator('quantity', {
                    rules: [{ required: true, message: 'Select quantity' }],
                    })(
                        <InputNumber min={ 1 } placeholder="Quantity" />
                    )}
                    </FormItem>
                
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">Order</Button>
                    </FormItem>

                </Form>
                <Modal
                    title="Success"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                        <p> { this.state.message } </p>
                </Modal>
            </div>
            )
        }
    }
}

const WrappedItemDetailPage = Form.create()(ItemDetailPage);

const mapStateToProps = state => ({
    current_user: state.users.user,
    display_item: state.items.displayItem,
    message: state.items.message,
    loading: state.items.loading, 
    error: state.items.error,
})

export default connect(mapStateToProps, { getItem, order, currentUser })(WrappedItemDetailPage)
