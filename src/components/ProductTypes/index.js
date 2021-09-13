import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { PRODUCT_TYPES } from "../../constants";
import { setProductType } from '../../actions/cartActions'

const Heading = styled.div`
    font-size: 20px;
    line-height: 26px;
    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
    color: #6F6F6F;
`;

const ProductType = styled.div`
    padding: 6px 16px;
    width: 61px;
    background: #F2F0FD;
    border-radius: 2px;
    border: 1px solid #1EA4CE;
    color: #1EA4CE;
    margin: 16px 8px 16px 0;
    cursor: pointer;
    display: inline-block;
    text-align: center;

    &.selected {
        background: #1EA4CE;
        color: #fff;
    }
`;

const ProductTypes = (props) => {
    return (
        <>
            <Heading>Products</Heading>
            {
                PRODUCT_TYPES.map((product, i) => {
                    return (
                        <ProductType
                            key={i}
                            className={props.productType === product ? "selected" : ""}
                            onClick={()=>{
                                props.setProductType(product);
                            }}>
                            {product}
                        </ProductType>
                    );
                })
            }
        </>
    );
}

const mapStateToProps = (state)=>{
    return {
        productType: state.productType
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        setProductType: (product) => { dispatch(setProductType(product))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypes);
