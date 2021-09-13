import React, { Component } from 'react';
import { connect } from 'react-redux';
import {isEqual} from "lodash";
import styled from 'styled-components';
import { Row, Col, Modal, ModalBody, ModalFooter, Button } from '@bootstrap-styled/v4';

import Cart from '../Cart';
import Sorting from "../Sorting";
import Brands from "../Brands";
import Tags from "../Tags";
import Pagination from "../Pagination";
import ProductTypes from "../ProductTypes";
import List from "../List";

import { addItems } from '../../actions/cartActions'
import { SORTING_LIST, PAGE_LIMIT } from "../../constants";

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
            isOpen: false,
            offset: 1,
            noOfPages: 20
        };
    }

    componentDidMount() {
        this.loadItemsFromServer(0, false);
    }

    componentDidUpdate(prevProps) {
        let prevSort = prevProps.sortingId;
        let currSort = this.props.sortingId;
        let prevProdType = prevProps.productType;
        let currProdType = this.props.productType;
        let prevBrands = prevProps.brands;
        let currBrands = this.props.brands;
        let prevTags = prevProps.tags;
        let currTags = this.props.tags;

        if ((!isEqual(prevSort, currSort)) || (!isEqual(prevProdType, currProdType)) || (!isEqual(prevBrands, currBrands)) || (!isEqual(prevTags, currTags))) {
            if (this.state.offset !== 1) {
                this.setState({
                    offset: 1
                })
            }
            this.loadItemsFromServer(0, false);
        }
    }

    handleClose = () => this.setState({ isOpen: !this.state.isOpen });

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        let fetchNextData = false;
        if (selected === Math.ceil(this.props.items.length / PAGE_LIMIT)) {
            fetchNextData = true;
        }
        this.setState({
             offset: selected
            }, () => {
                if (selected >= Math.ceil(this.props.items.length / PAGE_LIMIT)) {
                    this.loadItemsFromServer(selected, fetchNextData);
                }
        });
    }

    loadItemsFromServer = async (offset, fetchNextData = false) => {
        const {noOfPages} = this.state;
        const { sortingId, brands, productType, tags } = this.props;
        // let pageFilter = `_page=${offset}`;
        let offsetFilter = `_start=${(offset) * PAGE_LIMIT}&_end=${(offset + noOfPages) * PAGE_LIMIT}`;
        let brandsFilter = "";
        let tagsFilter = "";
        // let limitFilter = `&_limit=${20 * 16}`;
        if (brands.length && brands[0] !== "All") {
            for (let i = 0; i < brands.length; i++) {
                brandsFilter = brandsFilter + "&manufacturer=" + brands[i];
            }
        }
        if (tags.length && tags[0] !== "All") {
            for (let i = 0; i < tags.length; i++) {
                tagsFilter = tagsFilter + "&tags_like=" + tags[i];
            }
        }
        const res = await fetch(`/items?${offsetFilter}&_sort=${SORTING_LIST[sortingId].sort}&_order=${SORTING_LIST[sortingId].order}${brandsFilter}${tagsFilter}&itemType=${productType}`,{
            headers:{
                "accepts":"application/json"
            }
        });
        let data = await res.json();
        if (data.length) {
            if (fetchNextData) {
                data = [
                    ...this.props.items,
                    ...data
                ];
            }
            this.props.addItems(data);
        }
    }

    getFilters = () => {
        return (
            <>
                <Sorting />
                <Brands />
                <Tags />
            </>
        );
    }

    getFilterModal = () => {
        return (
            <>
            <Filter onClick={() => this.handleClose()}>Filters</Filter>
            <Modal isOpen={this.state.isOpen} toggle={() => this.handleClose()}>
                <ModalBody>
                    <ProductTypes />
                    {this.getFilters()}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => this.handleClose()}>Apply</Button>
                </ModalFooter>
            </Modal>
            </>
        );
    }

    getWebProductContent = () => {
        return (
            <>
            <ProductTypes />
            <StyledRow>
                <List offset={this.state.offset} items={this.props.items} addToCart={this.props.addToCart}/>
            </StyledRow>
            <Pagination
                count={Math.ceil(this.props.items.length / PAGE_LIMIT)}
                marginPages={4}
                pageRange={3}
                pageChangeHandler={this.handlePageClick}
            />
            </>
        );
    }

    getMobProductContent = () => {
        return (
            <>
            <StyledRow>
                <List offset={this.state.offset} items={this.props.items} addToCart={this.props.addToCart}/>
            </StyledRow>
            <Pagination
                count={Math.ceil(this.props.items.length / PAGE_LIMIT)}
                marginPages={3}
                pageRange={1}
                pageChangeHandler={this.handlePageClick}
            />
            </>
        );
    }

    render(){
        return (
            <RowWithMargin className="margin120">
                {/* WEB VIEW */}
                <WebCol md="3">{this.getFilters()}</WebCol>
                <WebCol md="6" sm="12">{this.getWebProductContent()}</WebCol>
                <WebCol md="3"><Cart /></WebCol>

                {/* MOBILE VIEW */}
                <MobileCol sm="12">{this.getFilterModal()}</MobileCol>
                <MobileCol sm="12">{this.getMobProductContent()}</MobileCol>
            </RowWithMargin>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        items: state.items,
        productType: state.productType,
        sortingId: state.sortingId,
        brands: state.brands,
        tags: state.tags
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        addItems: (data) => { dispatch(addItems(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
