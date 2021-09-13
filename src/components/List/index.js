import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row, Col, Button } from '@bootstrap-styled/v4';

import { addToCart } from '../../actions/cartActions';

import Freeze from "../Freeze";

const CardsContainer = styled.div`
    padding: 24px 15px;
    background: #fff;
    border-radius: 2px;
    margin: 0 auto;
`;

const Card = styled.div`
    margin-bottom: 24px;
    width: 136px;

    .card-content {
        min-height: 100px;
        position: relative;
    }

    .card-image {
        padding: 16px;
        background: #FEFEFE;
        border: 1.17666px solid #F3F0FE;
        border-radius: 12px;
        width: 124px;
        margin-bottom: 8px;

        .image {
            width: 92px;
            height: 92px;
            background: #C4C4C4;
        }
    }

    .price {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
        margin-bottom: 8px;
        color: #1EA4CE;

    }

    .card-title {
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
        margin-bottom: 8px;
    }

    .add {
        width: 124px;
        height: 22px;
        background: #1EA4CE;
        border-radius: 2px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 5px;
        color: #FFFFFF;
        margin-bottom: 8px;
        border: 1px solid #1ea4ce;
        position: absolute;
        bottom: 0;

        &:hover {
            background: #fff;
            color: #1EA4CE;
        }
    }

    @media(max-width: 1620px) {
        width: 112px;
    }

    @media(max-width: 1425px) {
        width: 110px;
    }

    @media(max-width: 1199px) {
        width: 136px;
    }
`;

const EmptyCol = styled(Col) `
    text-align: center;
    padding: 100px;
`;

const FlexUnsetCol = styled(Col)`
    flex-grow: unset !important;

    @media(max-width: 1199px) {
        padding: 0 10px !important;
    }
`;

const List = (props) => {
    const startIndex = (props.offset - 1) * 16;
    let newItems = props.items.slice(startIndex, startIndex + 16);
    let itemList = [], size = 4;
    for (let i = 0; i < newItems.length; i += size) {
        itemList.push(newItems.slice(i, i + size));
    }
    if (props.loading) {
        return (
            <Freeze />
        );
    }
    if (!itemList.length) {
        return (
            <EmptyCol>No Products to show!</EmptyCol>
        );
    }
    return (
        <CardsContainer>
        {
            itemList.map((list, i) => {
                return (
                    <Row key={i}>
                        {
                            list.map((item) => {
                                return (
                                    <FlexUnsetCol key={item.id}>
                                        <Card>
                                            <div className="card-image">
                                                <img src="https://via.placeholder.com/92" alt="placeholder"/>
                                            </div>
                                            <div className="card-content">
                                                <div className="price">₺ {item.price}</div>
                                                <div className="card-title">{item.name}</div>
                                                <Button color="primary" onClick={()=>{props.addToCart(item.id)}} className="add">Add</Button>
                                            </div>
                                        </Card>
                                    </FlexUnsetCol>
                                );
                            })
                        }
                    </Row>
                );
            })
        }
        </CardsContainer>
    );
};

const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (product) => { dispatch(addToCart(product))}
    }
}

export default connect(null, mapDispatchToProps)(List);
