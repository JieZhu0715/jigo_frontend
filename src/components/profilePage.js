import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, List} from 'antd';
import { logout } from './../actions/users' 

import '../css/App.css';

class ProfilePage extends Component {
    
    onLogoutClick = () => {
        window.sessionStorage.userInfo = null;
        this.props.logout();
        this.props.history.push('/');
    }


    render() {
      console.log(this.props.user)
      let { user } = this.props
      return (
          <div className="App">
          { user &&  ( 
              <div>
                
                <List
                  size="large"
                  header={ <div>Your profile</div> }
                  // footer={<div>Footer</div>}
                  bordered
                  // dataSource={data}
                  // renderItem={item => (<List.Item>{item}</List.Item>)}
                >
                  <List.Item>用户名: { user.name }</List.Item>
                  <List.Item>邮箱: { user.email }</List.Item>
                  <List.Item>简介: { user.introduce }</List.Item>
                  <List.Item>
                    <Button type="Danger" onClick = { this.onLogoutClick }> 注销用户 </Button>
                  </List.Item>
                </List>
                
              </div>
            )
          }
          { !user &&  (          
            <div>
              登陆以后查看用户资料
            </div>
            )
          }
        </div>
      );
    }
}

const mapStateToProps = state => {
    let user = state.users.user
    return {
        user,
    }
}

export default connect( mapStateToProps, { logout })(withRouter(ProfilePage))
