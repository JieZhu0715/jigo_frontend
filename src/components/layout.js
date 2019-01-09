import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Layout, Menu, Icon, } from 'antd';
import UserHeader from './header'
  
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class LayoutPage extends Component
{   
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

    onMenuClick = item => {
        // Jump to main page
        this.props.history.push('/' + item.key);
    }

    render() {
        return (
            <Layout>
                <UserHeader />
              <Layout>
                <Sider 
                  collapsible
                  collapsed={this.state.collapsed}
                  onCollapse={this.onCollapse}
                  breakpoint="lg" 
                  // collapsedWidth="0" 
                  width={200} 
                  style={{ background: '#fff' }}>
                  <Menu
                    // theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['manage']}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={ this.onMenuClick }
                  >
                    <Menu.Item key="items">浏览商品</Menu.Item>
                      <Menu.Item key="request_item">添加其他</Menu.Item>
                    <SubMenu key="manage" title={<span><Icon type="user" />管理</span> }>
                      <Menu.Item key="profile"><Icon type="user"/>用户资料</Menu.Item>
                      <Menu.Item key="orders">我的订单</Menu.Item>
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