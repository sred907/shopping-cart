import React from 'react';
import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { Row } from '@bootstrap-styled/v4';

import {WebCol, MobileCol} from "../../commonStyles";


const PaginationCont = styled.div`
    ul {
        display: block;
        margin: 32px auto;
        text-align: center;
        width: 100%;
        padding: 0;
    }

    li {
        margin: 0 4px;
        background: transparent;
        border-radius: 2px;
        display: inline-block;
        font-size: 15px;
        font-weight: normal;
        line-height: 2;
        letter-spacing: normal;
        text-align: center;
        color: #697488;
        width: 28px;
        height: 28px;
        cursor: pointer;

        &.active {
            background-color: #1EA4CE;
    
            a {
                color: #fff;
            }
        }

        &.previous {
            margin: 0 20px 0 4px;

            @media(max-width: 1199px) {
                width: 0;
                margin-right: 0;
            }
        }

        &.next {
            color: #697488;
            margin: 0 4px 0 20px;

            @media(max-width: 1199px) {
                width: 0;
                margin-left: 0;
            }
        }

        @media(max-width: 767px) {
            margin: 0 !important;
        }
    }
`;

const List = styled.div`
    transition: ease-in all .2s;
    position: relative;

    .arrow {
        position: relative;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #1EA4CE;
        border-left: 2px solid #1EA4CE;
        transform: rotate(45deg);
        position: absolute;
        display:inline-block;
        top: 11px;
        left: -25px;
        color: #1EA4CE;

        @media(max-width: 1199px) {
            top: 19px;
        }
    }

    .arrow:after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: -1px;
        border-bottom: 2px solid #1EA4CE;
        width: 14px;
        transform: rotate(-45deg);
        transform-origin: 0 0;
    }

    .next {
        transform: rotate(-135deg);
        left: 48px;
        border-bottom: 2px solid #697488;
        border-left: 2px solid #697488;
        color: #697488;

        @media(max-width: 1199px) {
            left: 10px;
        }
    }

    .next:after {
        color: #697488;
        border-bottom: 2px solid #697488;
    }

    &.prev {
        color: #1EA4CE;
    }

    &.active {
        background-color: #1EA4CE;

        a {
            color: #fff;
        }
    }
`;

const Pagination = (props) => {
    let {count, marginPages, pageRange, pageChangeHandler, forcePage} = props;
    return (
        <Row>
            <WebCol md="12">
                <PaginationCont>
                    <ReactPaginate
                        previousLabel={
                            <List>
                                <div className="arrow"></div> Prev
                            </List>
                        }
                        nextLabel={
                            <List className="next">
                                Next <div className="arrow next"></div>
                            </List>
                        }
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={count}
                        marginPagesDisplayed={marginPages}
                        pageRangeDisplayed={pageRange}
                        onPageChange={pageChangeHandler}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        forcePage={forcePage - 1}
                    />
                </PaginationCont>
            </WebCol>
            <MobileCol sm="12">
                <PaginationCont>
                    <ReactPaginate
                        previousLabel={
                            <List>
                                <div className="arrow"></div>
                            </List>
                        }
                        nextLabel={
                            <List className="next">
                                <div className="arrow next"></div>
                            </List>
                        }
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={count}
                        marginPagesDisplayed={marginPages}
                        pageRangeDisplayed={pageRange}
                        onPageChange={pageChangeHandler}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        forcePage={forcePage - 1}
                    />
                </PaginationCont>
            </MobileCol>
        </Row>
    );
}

Pagination.propTypes = {
    count: PropTypes.number,
    marginPages: PropTypes.number,
    pageRange: PropTypes.number,
    pageChangeHandler: PropTypes.func,
    forcePage: PropTypes.number
};

export default Pagination;
