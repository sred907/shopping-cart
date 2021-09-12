import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from '@bootstrap-styled/v4';

import { removeItem,addQuantity,subtractQuantity} from '../../actions/cartActions';

const CartContainer = styled.div`
    padding: 0;
    background: #FFFFFF;
    border: 5px solid #1EA4CE;
    box-sizing: border-box;
    border-radius: 2px;
`;

const List = styled.div`
    text-align: center;
    padding: 22px 26px 0;
`;
const Title = styled.div`
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.16px;
    color: #191919;
    text-align: left;
`;
const Price = styled.div`
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.16px;
    color: #1EA4CE;
    text-align: left;
    margin-top: 5px;
`;

const Quantifier = styled.div`
    color: #1EA4CE;
    font-size: 15px;
    font-weight: 900;
    display: inline-block;
    cursor: pointer;
`;

const Quantity = styled.div`
    font-size: 15px;
    line-height: 10px;
    text-align: center;
    color: #FFFFFF;
    padding: 12px;
    background: #1EA4CE;
    display: inline-block;
    margin: 0 12px;
`;

const Text = styled.div`
    text-align: center;
    padding: 22px 26px;
    font-size: 14px;
    letter-spacing: 0.16px;
    color: #191919;
`;

const Total = styled.div`
    background: #FFFFFF;
    border: 2px solid #1EA4CE;
    border-radius: 2px;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #1EA4CE;
    padding: 14px 24px;
    margin: 15px;
`;

class Cart extends Component {
    //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

    getListItem = (item) => {
        return (
            <List key={item.id}>
                <Row style={{borderBottom: "1px solid #F4F4F4", paddingBottom: "15px"}}>
                    <Col xs="7">
                        <Title>{item.title}</Title>
                        <Price>₺ {item.price}</Price>
                    </Col>
                    <Col xs="5">
                        <Quantifier onClick={()=>{this.handleSubtractQuantity(item.id)}}>&#8722;</Quantifier>
                        <Quantity>{item.quantity}</Quantity>
                        <Quantifier onClick={()=>{this.handleAddQuantity(item.id)}}>&#43;</Quantifier>
                    </Col>
                </Row>
            </List>
        );
    }

    render(){
        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item=>{
                    return(
                        <li key={item.id} style={{listStyle: "none"}}>
                            {
                                this.getListItem(item)
                            }
                        </li>
                    )
                })
            ):
            (
            <Text>Your Cart is empty!</Text>
            )
       return(
            <CartContainer>
                {addedItems}
                {this.props.items.length ?
                    <Row>
                        <Col md="6"></Col>
                        <Col md="6">
                            <Total>₺ {this.props.total}</Total>
                        </Col>
                    </Row> : null
                }
            </CartContainer>
       )
    }
}
const mapStateToProps = (state)=>{
    return {
        items: state.addedItems,
        total: state.total
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
