import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Modal, } from 'antd'

import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'

import { addItem } from '../../actions/items'
import { currentUser } from '../../actions/users'

const FormItem = Form.Item;

class ItemEditPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {}
    }

    componentDidMount() 
    {
      if (document.getElementById('editor'))
      {
        this.state.smde = new SimpleMDE({
          element: document.getElementById('editor').childElementCount,
          autofocus: true,
          autosave: true,
          previewRender(plainText) {
            return marked(plainText, {
              renderer: new marked.Renderer(),
              gfm: true,
              pedantic: false,
              sanitize: false,
              tables: true,
              breaks: true,
              smartLists: true,
              smartypants: true,
              highlight(code) {
                return highlight.highlightAuto(code).value;
              },
            });
          },
        });
      }
            // get current user 
            this.props.currentUser()
    }
    
    getSmdeValue = () => {
        return this.state.smde.value();
    }
    
    setSmdeValue = content => {
        this.state.smde.value(content);
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
    handleOk = (e) => {
        console.log(e);
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            values.content = this.getSmdeValue()
            values.created_by = this.props.user._id
            console.log(values)
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
            <textarea id="editor" style={{ marginBottom: 20, width: 800 }} size="large" rows={6} ></textarea>
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
