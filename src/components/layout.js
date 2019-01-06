import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Layout, Menu, Icon, } from 'antd';
import UserHeader from './header'
  
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class LayoutPage extends Component
{   
    onMenuClick = item => {
        // Jump to main page
        this.props.history.push('/' + item.key);
    }

    render() {
        return (
            <Layout>
                <UserHeader />
              <Layout>
                <Sider breakpoint="lg" collapsedWidth="0" width={200} style={{ background: '#fff' }}>
                  <Menu
                    // theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['items']}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={ this.onMenuClick }
                  >
                    <SubMenu key="items" title={<span><Icon type="user" />Buy</span> }>
                      <Menu.Item key="items">All items</Menu.Item>
                      <Menu.Item key="request_item">Add new item</Menu.Item>
                    </SubMenu>
                    <SubMenu key="manage" title={<span><Icon type="user" />Manage</span> }>
                      <Menu.Item key="profile"><Icon type="user"/>Profile</Menu.Item>
                      <Menu.Item key="orders">My orders</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Content style={{
                    background: '#fff', padding: 24, margin: 0, minHeight: 280,
                  }}
                  >
                   { this.props.children }
                  </Content>
                </Layout>
              </Layout>
            </Layout>
        )
    }
} 

export default withRouter(LayoutPage)