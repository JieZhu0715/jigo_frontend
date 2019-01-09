import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Modal, } from 'antd'

import SimpleMDE from 'react-simplemde-editor';

import { addItem } from '../../actions/items'
import { currentUser } from '../../actions/users'


const FormItem = Form.Item;

class ItemEditPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    
    componentDidMount() 
    {
      // get current user 
      this.props.currentUser()
    }
    
    getSmdeValue = () => {
        return this.state.mdeValue;
    }
    
    setSmdeValue = content => {
        this.setState({ mdeValue: content }); 
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
      }
    
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

    handleReset = () => {
        this.props.form.resetFields();
    }

    handleSMDEChange = value => {
      this.setState({ mdeValue: value });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            values.content = this.getSmdeValue()
            values.created_by = this.props.user._id
          if (!err) {
              this.props.addItem(values, () => {
                this.handleReset()
                this.setSmdeValue('')
                this.showModal()
              })
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 2 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };

        let { user } = this.props
        
        if (!user || user.user_type !== 1)
        {
          // TODO validate user_type from server
          return (
            <div>You need to be an admin to access this page</div>
          )
        }
        
      return (
        <div>
        <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name">
          { getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Please input item name!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Description">
          { getFieldDecorator('description')(<Input />) }
        </FormItem>
        <FormItem {...formItemLayout} label="Cover Image">
          { getFieldDecorator('image_url', {
            rules: [{
              required: true, message: 'Please input item image url!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Price">
          { getFieldDecorator('price', {
            rules: [{
              required: true, message: 'Please input item price!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Content">
            <SimpleMDE 
              id='content' 
              onChange={ this.handleSMDEChange } 
              options= { {
                spellChecker: true,
                forceSync: true,
                autosave: {
                  enabled: true,
                  delay: 5000,
                  uniqueId: 'article_content',
                },
                tabSize: 4,
                toolbar: [
                  'bold',
                  'italic',
                  'heading',
                  '|',
                  'quote',
                  'code',
                  'table',
                  'horizontal-rule',
                  'unordered-list',
                  'ordered-list',
                  '|',
                  'link',
                  'image',
                  '|',
                  'side-by-side',
                  'fullscreen',
                  '|',
                  {
                    name: 'guide',
                    action () {
                      const win = window.open(
                        'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
                        '_blank',
                      );
                      if (win) {
                        // Browser has allowed it to be opened
                        win.focus();
                      }
                    },
                    className: 'fa fa-info-circle',
                    title: 'Markdown 语法！',
                  },
                ],
              }} />
        </FormItem>
        <FormItem>
            <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
        </Form>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Add new item successfully</p>
        </Modal>
        </div>
      );
    }
}

const WrappedItemEditPage = Form.create()(ItemEditPage);
const mapStateToProps = state => {
    let user = state.users.user
    return {
        user,
    }
}

export default connect(mapStateToProps, { addItem, currentUser })(WrappedItemEditPage)
