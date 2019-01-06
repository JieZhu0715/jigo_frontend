import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { List, Card } from 'antd';
import { listItems } from '../actions/items'

const { Meta } = Card;

class ItemsPage extends Component
{
    componentDidMount() {
        this.props.listItems();
    }    

    cardOnClick = (key) => {
        // console.log(card.key)
        this.props.history.push('/item/' + key)
    }

    render() {
        if (this.props.loading)
        {
            return (<div>Loading items</div>);
        }
        else if (this.props.error)
        {
            return (<div>Loading items failed : {this.props.error}</div>); 
        }
        else if (this.props.items)
        {   
            return (
                <List
                    grid={{ gutter: 50, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, }}
                    dataSource={ this.props.items }
                    renderItem={ item => (
                        <List.Item>
                            <Card 
                                key = { item._id }
                                hoverable  
                                onClick = { () => this.cardOnClick(item._id) }
                                cover={ <img alt="example" src={ item.image_url } /> }
                                // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            > 
                                <Meta title={ item.name } description={ item.description }/>
                            </Card>
                        </List.Item>)}
                />
            );
        }
        else
        {
            return (<div>No items found</div>);
        }
    }
}

const mapStateToProps = state => ({
    items: state.items.items,
    message: state.items.message,
    loading: state.items.loading, 
    error: state.items.error,
});

// https://react-redux.js.org/using-react-redux/connect-mapdispatch
const mapDispatchToprops = {
    listItems, 
}
export default connect(mapStateToProps, mapDispatchToprops)(withRouter(ItemsPage));