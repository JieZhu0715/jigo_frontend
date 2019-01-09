import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List, Avatar } from 'antd';

import { getUserOrders } from './../actions/orders'
import { currentUser } from '../actions/users'

class Userorders extends Component {
    componentDidMount()
    {
        this.props.getUserOrders(this.props.user_id)
    }

    render() 
    {
        return (
            <div>
            <List
            itemLayout="horizontal"
            header={ <div>您的订单</div> }
            size="large"
            dataSource={this.props.user_orders}
            renderItem={order => (
                <List.Item>
                    <List.Item.Meta
                    avatar={ <Avatar src={ order.item_id.image_url }/> }
                    title={ order.item_id.name }
                />
                    <div> 
                        <p> 商品名称: { order.item_id.name }</p>
                        <p> 下单日期: { order.createdAt }</p>
                        <p> 数量: { order.quantity }</p> 
                        <p> 当前状态: { order.status }</p>
                    </div>
                </List.Item>
                )}
            />
            </div>
        );
    }
}

class UserOrdersPage extends Component {

    render() {
      return (
          <div className="App">
          { this.props.current_user &&  (          
            <UserordersComponent user_id={ this.props.current_user._id }></UserordersComponent>
            )
          }
          { !this.props.current_user &&  (          
            <div> 登陆以后查看用户订单 </div>
            )
          }
        </div>
      );
    }
}

const mapStateToProps = state => {
    return {
        current_user: state.users.user,
        user_orders : state.orders.user_orders,
    }
}

const UserordersComponent = connect( mapStateToProps, {getUserOrders })(Userorders)

export default connect( mapStateToProps, { currentUser, getUserOrders })(withRouter(UserOrdersPage))
