import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logout } from './../actions/users' 

import '../css/App.css';

class UserRequestsPage extends Component {
    
    render() {
      return (
          <div className="App">
          { this.props.user &&  (          
              <div></div>
            )
          }
          { !this.props.user &&  (          
            <header className="App-header">
              You must login to review user profile
            </header>
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

export default connect( mapStateToProps, { logout })(withRouter(UserRequestsPage))
