import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'antd';

import { getAllOrders, resolveOrder } from '../../actions/orders'

// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
    // key: i,
    // name: `Edward King ${i}`,
    // age: 32,
    // address: `London, Park Lane no. ${i}`,
//   });
// }

class ManageOrdersPage extends Component {

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  componentDidMount()
  {
      this.props.getAllOrders();
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

//   onSelectChange = (selectedRowKeys) => {
//     // console.log('selectedRowKeys changed: ', selectedRowKeys);
//     this.setState({ selectedRowKeys });
//     this.props.resolveOrder(selectedRowKeys[0])
//   }

  render() {
    const columns = [
    //   {
    //     title: 'id',
    //     dataIndex: '_id',
    //   }, 
      {
        title: 'user',
        dataIndex: 'user_id.name',
      }, {
        title: 'item',
        dataIndex: 'item_id.name',
      }, {
          title: 'quantity', 
          dataIndex: 'quantity',
      }, {
        title: 'user email',
        dataIndex: 'user_id.email',
      }, {
          title: 'email',
          dataIndex: 'email',
      }, {
          title: 'wechat', 
          dataIndex: 'wechat',
      }, {
          title: 'status',
          dataIndex: 'status'
      }, {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Button onClick={ () => { this.props.resolveOrder(record._id) } }> 
              Resolve
              {/* <Divider type="vertical" /> */}
              {/* <a href="javascript:;">Delete</a> */}
            </Button>
          ),
        }
      ];

    // const { loading, selectedRowKeys } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };
    // const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          {/* <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Resolve
          </Button> */}
          {/* <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span> */}
        </div>
        <Table rowKey='_id' columns={columns} dataSource={ this.props.all_orders } />
      </div>
    );
  }
}

const mapStateToProps = state=> (
    {
        current_user: state.users.user,
        all_orders: state.orders.all_orders,
        loading_all_orders: state.orders.loading_all_orders,
    }
)

export default connect(mapStateToProps, { getAllOrders, resolveOrder })(ManageOrdersPage); 