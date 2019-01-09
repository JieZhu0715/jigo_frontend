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
        this.props.history.push('/broker_site/' + item.key);
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
                    defaultOpenKeys={['broker']}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={ this.onMenuClick }
                  >
                    <SubMenu key="broker" title={<span><Icon type="laptop" />Pick up requests</span> }>
                      <Menu.Item key="item_edit">Edit Item</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="manage_orders">Manage Orders</Menu.Item> 
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