import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Avatar } from 'antd';
import { findUser } from '../actions/users';

import '../css/App.css';

class UserCard extends Component {

    constructor(props)
    {
        console.log(props)
        super(props)
    }

    componentDidMount() 
    {
        let { user_id }  = this.props;
        this.props.findUser(user_id);
    }

    render() {
        let { itemCreatedBy } = this.props
        if (itemCreatedBy)
        {
            console.log(this.props.itemCreatedBy);
            return (
                <div>
                        <Avatar className="auth-logo" size="small" icon="user">
                        </Avatar> 
                        { itemCreatedBy.name } - { itemCreatedBy.introduce }

                </div>
              );
        }
        else
        {
            return (<div />); 
        }
    }
}

const mapStateToProps = state => ({
    itemCreatedBy: state.users.itemCreatedBy
})

export default connect( mapStateToProps, { findUser } )(UserCard)
