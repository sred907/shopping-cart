import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PaginationList = styled.ul`
    display: inline-block;
    padding: 0;
    margin: 45px auto;
`;

const List = styled.li`
    margin: 0 4px;
    background: transparent;
    border-radius: 2px;
    display: inline-block;
    font-size: 16px;
    font-weight: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: center;
    color: #1EA4CE;

    &.pager {
        width: 30px;
        height: 30px;
    }

    a {
        width: 100%;
        height: 100%;
        color: #697488;
        text-decoration: none;
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
            top: 5px;
            left: -25px;
            color: #1EA4CE;
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
        }

        .next:after {
            color: #697488;
            border-bottom: 2px solid #697488;
        }

        &.prev {
            color: #1EA4CE;
        }
    }

    &.active {
        background-color: #1EA4CE;

        a {
            color: #fff;
        }
    }

    &.disabled {
        cursor: not-allowed;

        a {
            pointer-events: none;
        }
    }
`;

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {}
        };
    }

    componentDidMount() {
        const { initialPage, currentPage } = this.props;
        this.setPage(currentPage || initialPage);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.totalPageNum !== this.props.totalPageNum
            || prevProps.currentPage !== this.props.currentPage) {
            this.setPage(prevProps.currentPage, prevProps.totalPageNum);
        }
        // reset pagination if items array is updated
        const { initialPage, currentPage } = this.props;
        if (this.props.items !== prevProps.items) {
            this.setPage(currentPage || initialPage);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.totalPageNum !== this.props.totalPageNum
    //         || nextProps.currentPage !== this.props.currentPage) {
    //         this.setPage(nextProps.currentPage, nextProps.totalPageNum);
    //     }
    // }

    setPage(page, totalPages) {
        let { items, pageSize } = this.props;
        let { pager } = this.state;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        if (items && items.length) {
            // page content also managed by pagination component (items is passed in)
            pager = this.getPager({
                totalItems: items.length,
                currentPage: page,
                pageSize
            });
            let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
            this.setState({ pager });
            this.props.onChangePage(pageOfItems);
        } else {
            // for dummy pagination works as link only (totalPageNum is passed in)
            pager = this.getPager({
                totalPageNum: totalPages || this.props.totalPageNum,
                currentPage: page,
                pageSize
            });
            this.setState({ pager });
        }
    }

    getPager({totalItems, totalPageNum, currentPage, pageSize}) {
        currentPage = currentPage || 1;
        pageSize = pageSize ?  currentPage === 1 ? 9 : pageSize : 10;

        let totalPages = totalPageNum || Math.ceil(totalItems / pageSize);
        let numberOfBtns = this.props.numberOfBtns || 10;

        let startPage, endPage;
        if (totalPages <= numberOfBtns) {
            startPage = 1;
            endPage = totalPages;
        } else {
            let half = Math.floor(numberOfBtns / 2);
            if (currentPage <= half + 1) {
                startPage = 1;
                endPage = numberOfBtns;
            } else if (currentPage + half - 1 >= totalPages) {
                startPage = totalPages - (numberOfBtns - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - half;
                endPage = currentPage + half - 1;
                if (half !== numberOfBtns / 2) {
                    endPage++;
                }
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        if (this.props.setTotalPages) {
            this.props.setTotalPages(totalPages);
        }

        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startIndex,
            endIndex,
            pages
        };
    }

    render () {
        const { pager } = this.state;
        const { basePath } = this.props;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <PaginationList>
                <List className={pager.currentPage === 1 ? "disabled" : ""}>
                    <Link to={`${basePath}${pager.currentPage - 1 <= 1 ? "" : (pager.currentPage - 1 + "/")}`}
                        onClick={() => this.setPage(pager.currentPage - 1)} className="prev">
                        <div className="arrow"></div> Prev
                    </Link>
                </List>
                {
                    pager.pages.map((page, index) => (
                        <List key={index} className={`pager ${pager.currentPage === page ? "active" : ""}`}>
                            <Link
                                to={`${basePath}${page === 1 ? "" : (page + "/")}`}
                                onClick={() => this.setPage(page)}>{page}</Link>
                        </List>
                    ))
                }
                <List className={pager.currentPage === pager.totalPages ? "disabled" : ""}>
                    <Link
                        to={`${basePath}${pager.currentPage + 1 >= pager.totalPages ? pager.totalPages : pager.currentPage + 1}/`}
                        onClick={() => this.setPage(pager.currentPage + 1)}>Next <div className="arrow next"></div></Link>
                </List>
            </PaginationList>
        );
    }
}

Pagination.propTypes = {
    items: PropTypes.array,
    basePath: PropTypes.string.isRequired,
    onChangePage: PropTypes.func,
    setTotalPages: PropTypes.func,
    totalPageNum: PropTypes.number,
    currentPage: PropTypes.number,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
    numberOfBtns: PropTypes.number,
    pageClass: PropTypes.string
};

Pagination.defaultProps = {
    initialPage: 1
};

export default Pagination;
