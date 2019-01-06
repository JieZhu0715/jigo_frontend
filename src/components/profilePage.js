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
                  <List.Item>Name: { user.name }</List.Item>
                  <List.Item>Email: { user.email }</List.Item>
                  <List.Item>Introduce: { user.introduce }</List.Item>
                  <List.Item>
                    <Button type="Danger" onClick = { this.onLogoutClick }> Log out </Button>
                  </List.Item>
                </List>
                
              </div>
            )
          }
          { !user &&  (          
            <div>
              You must login to review user profile
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
