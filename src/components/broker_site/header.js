import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Form, Layout, Icon, Avatar, Button, Row, Col, Modal, Input, Checkbox } from 'antd';

import { currentUser } from '../../actions/users'
import { login } from '../../actions/users'

const FormItem = Form.Item;
const { Header } = Layout;

class LoginForm extends Component {
    render() {
        const {
            visible, onCancel, onCreate, form, loading
          } = this.props;
        const { getFieldDecorator } = form;
        
        return (
            <Modal
                visible={visible}
                title="Login"
                footer={[
                <Button key="back" onClick={onCancel}>取消</Button>,
                <Button key="submit" type="primary" loading={loading} onClick={onCreate}> 登陆 </Button>,]}
            >

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                    {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入有效邮箱!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入你的密码!' }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                    })(
                        <Checkbox className='login-form-register-remember'>Remember me</Checkbox>
                    )}
                        <a className="login-form-forgot" 
                            // href=""
                        >Forgot password</a>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);


class UserHeader extends Component {
    constructor(props) 
    {
        super(props)
        this.state = { visible: false, loading: false }
    }
    
    componentDidMount() 
    {
        this.props.currentUser()
    }

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = event => {
        this.setState({ visible: false})
    }
    
    handleSubmit = event => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
          this.setState({ loading: true })
          console.log(this.props.login)
          this.props.login(values, () => {
                  // Set front end session
                  window.sessionStorage.userInfo = JSON.stringify(this.props.user)
                  form.resetFields();
                  this.setState({ visible: false });
              })
        });
      }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
      
    render() {
        return (
        <Header className="header">
            <div className="logo" />
              {
                  this.props.user && 
                  (
                    <div style={{ float: 'right'}} >
                        <Button> <Link to="/"> Go to user site </Link> </Button> 
                        <Avatar style={{ backgroundColor: this.props.color, verticalAlign: 'middle' }} size="large">
                            { this.props.user.name }
                        </Avatar>

                    </div>
                  )
              }
              {
                  !this.props.user && 
                  (
                    <div>
                    <Row type="flex" justify="end">
                        <Col span={ 2 }>
                            <Button onClick= { this.showModal }> 登陆 </Button>
                        </Col>
                        <Col span={ 2 }>
                            <Button type='primary'><Link to="/login"> 注册 </Link></Button>
                        </Col>
                    </Row>
                    <WrappedLoginForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={ this.state.visible }
                        loading={ this.state.loading }
                        onCancel={ this.handleCancel }
                        onCreate={ this.handleSubmit }
                    />
                    </div>
                  ) 
              }
        </Header>)
    }
}

const mapStateToProps = state => {
    let user = state.users.user
    let colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    return {
        user,
        color: user ? colorList[user._id % 4] : colorList[0],
        loading: state.users.loading,
        error: state.users.loading,
    }
}

export default connect(mapStateToProps, { login, currentUser })(UserHeader)