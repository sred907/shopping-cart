import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Modal, ModalBody, ModalFooter, Button } from '@bootstrap-styled/v4';

import Cart from '../Cart';
import Sorting from "../Sorting";
import Brands from "../Brands";
import Tags from "../Tags";
import Pagination from "../Pagination";

import { addToCart } from '../../actions/cartActions'

const ITEM_TYPES = ["mug", "shirt"];

const CardsContainer = styled.div`
    padding: 24px 15px;
    background: #fff;
    box-shadow: 0px 4px 24px rgba(93, 62, 188, 0.04);
    border-radius: 2px;
    margin: 0 auto;
`;

const Card = styled.div`
    margin-bottom: 24px;

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
`;

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

    &.selected {
        background: #1EA4CE;
        color: #fff;
    }
`;

const StyledRow = styled(Row)`
    background: #fff;
    box-shadow: 0px 4px 24px rgba(93, 62, 188, 0.04);
    border-radius: 2px;
    padding: 0 15px;
`;

const WebCol = styled(Col)`
    @media(max-width: 1199px) {
        display: none;
    }
`;

const MobileCol = styled(Col)`
    display: none;

    @media(max-width: 1199px) {
        display: block;
    }
`;

const RowWithMargin = styled(Row)`
    margin: 0 120px !important;

    @media(max-width: 1199px) {
        margin: 0 !important;
        padding: 0 15px;
    }
`;

const Filter = styled.div`
    padding: 15px;
    width: auto;
    background: #FFF;
    border-radius: 2px;
    border: 1px solid #1EA4CE;
    color: #1EA4CE;
    margin: 16px 0;
    cursor: pointer;
    text-align: center;
`;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "mug",
            isOpen: false
        };
    }

    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    getModifiedList = (items) => {
        let arrays = [], size = 4;

        for (let i = 0; i < items.length; i += size) {
            arrays.push(items.slice(i, i + size));
        }

        return arrays;
    }

    handleProductType = (item) => {
        this.setState({
            selectedItem: item
        });
    }

    getItemList = () => {
        let currentPage = this.props.match.params.pageNumber ? parseInt(this.props.match.params.pageNumber) : 1;
        const startIndex = (currentPage - 1) * 16;
        let newItems = this.props.items.slice(startIndex, startIndex + 16);
        this.items = this.getModifiedList(newItems);

        let itemList = this.items.map((list, i) => {
            return (
                <Row key={i}>
                    {
                        list.map((item) => {
                            return (
                                <Col key={item.id}>
                                    <Card>
                                        <div className="card-image">
                                            <div className="image"></div>
                                        </div>
                                        <div className="card-content">
                                            <div className="price">₺ {item.price}</div>
                                            <div className="card-title">{item.name}</div>
                                            <Button color="primary" onClick={()=>{this.handleClick(item.id)}} className="add">Add</Button>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
            );
        });

        return itemList;
    }

    handleClose = () => this.setState({ isOpen: !this.state.isOpen });

    render(){
        let { selectedItem } = this.state;
        let currentPage = this.props.match.params.pageNumber ? parseInt(this.props.match.params.pageNumber) : 1;
        return (
            <RowWithMargin className="margin120">
                <WebCol md="3">
                    <Sorting />
                    <Brands />
                    <Tags />
                </WebCol>
                <WebCol md="6" sm="12">
                    <Row>
                        <Heading>Products</Heading>
                    </Row>
                    <Row>
                        {
                            ITEM_TYPES.map((item, i) => {
                                return (
                                    <ProductType key={i} className={selectedItem === item ? "selected" : ""} onClick={()=>{this.handleProductType(item)}}>
                                        {item}
                                    </ProductType>
                                );
                            })
                        }
                    </Row>
                    <StyledRow>
                        <CardsContainer>{this.getItemList()}</CardsContainer>
                    </StyledRow>
                    <Row>
                        <Pagination
                            basePath="/"
                            currentPage={currentPage}
                            totalPageNum={Math.ceil(this.props.items.length / 16)}
                            pageSize={16} 
                        />
                    </Row>
                </WebCol>
                <WebCol md="3">
                    <Cart />
                </WebCol>
                <MobileCol sm="12">
                        <Filter onClick={() => this.handleClose()}>Filters</Filter>
                        <Modal isOpen={this.state.isOpen} toggle={() => this.handleClose()}>
                            <ModalBody>
                                <Heading>Products</Heading>
                                {
                                    ITEM_TYPES.map((item, i) => {
                                        return (
                                            <ProductType key={i} className={selectedItem === item ? "selected" : ""} onClick={()=>{this.handleProductType(item)}}>
                                                {item}
                                            </ProductType>
                                        );
                                    })
                                }
                                <Sorting />
                                <Brands />
                                <Tags />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={() => this.handleClose()}>Close</Button>
                            </ModalFooter>
                        </Modal>
                </MobileCol>
                <MobileCol sm="12">
                    <StyledRow>
                        <CardsContainer>{this.getItemList()}</CardsContainer>
                    </StyledRow>
                    <Row>
                        <Pagination
                            basePath="/"
                            currentPage={currentPage}
                            totalPageNum={Math.ceil(this.props.items.length / 16)}
                            pageSize={16} 
                        />
                    </Row>
                </MobileCol>
            </RowWithMargin>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        items: state.items
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);