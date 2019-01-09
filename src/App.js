import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ItemsPage from './components/itemsPage'
import Layout from './components/layout'
import ProfilePage from './components/profilePage'
import RegisterPage from './components/userRegisterPage'
import ItemDetailPage from './components/itemDetailPage'
import ItemRequestPage from './components/itemRequestPage'
import UserOrdersPage from './components/userOrdersPage'
import UserRequestsPage from './components/userRequestsPage'

import BrokerSiteLayout from './components/broker_site/layout'
import ItemEditPage from './components/broker_site/itemEditPage'
import ManageOrdersPage from './components/broker_site/manageOrdersPage'

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch >
            <Route exact path='/' render={ props => <Layout><ItemsPage /></Layout> }/>
            <Route path='/register' component={ RegisterPage } />
            <Route path='/items' render={ props => <Layout><ItemsPage /></Layout> }/>
            <Route path='/request_item' render={ props => <Layout><ItemRequestPage /></Layout>} />
            <Route path='/profile' render={ props => <Layout><ProfilePage /></Layout> }/>
            <Route path='/item/:_id' render={ props => <Layout><ItemDetailPage { ...props } /></Layout> }/>
            <Route path='/orders' render={ props => <Layout><UserOrdersPage /></Layout> }/>
            <Route path='/requests' render={ props => <Layout><UserRequestsPage /></Layout> }/>


            <Route path='/broker_site/item_edit' render={ props => <BrokerSiteLayout><ItemEditPage /></BrokerSiteLayout> } />
            <Route path='/broker_site/item_edit/:_id' render={ props => <BrokerSiteLayout><ItemEditPage { ...props } /></BrokerSiteLayout> } />
            <Route path='/broker_site/manage_orders' render={ props => <BrokerSiteLayout> <ManageOrdersPage /> </BrokerSiteLayout>} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
